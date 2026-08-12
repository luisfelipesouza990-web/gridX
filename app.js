/* =========================================================
   GRID-X CONTROL
   GitHub Pages + Supabase
========================================================= */


/* =========================================================
   CONFIGURAÇÃO DO SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://fshnewxgiskenkkgfbnv.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Uy4h5ag9SKPOUwhY4yS6dQ_1EpsrnZ1";


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================================================
   ELEMENTOS
========================================================= */

const loginScreen =
    document.getElementById("loginScreen");

const appScreen =
    document.getElementById("appScreen");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const logoutButton =
    document.getElementById("logoutButton");

const forgotPassword =
    document.getElementById("forgotPassword");

const passwordModal =
    document.getElementById("passwordModal");

const closeModal =
    document.getElementById("closeModal");

const sendRecovery =
    document.getElementById("sendRecovery");

const recoveryEmail =
    document.getElementById("recoveryEmail");

const recoveryMessage =
    document.getElementById("recoveryMessage");

const connectionDot =
    document.getElementById("connectionDot");

const connectionText =
    document.getElementById("connectionText");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");


/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function showLoginMessage(message, type = "error") {

    loginMessage.textContent = message;

    loginMessage.className =
        "message " + type;
}


function showRecoveryMessage(message, type = "error") {

    recoveryMessage.textContent = message;

    recoveryMessage.className =
        "message " + type;
}


function getInitial(name, email) {

    const value =
        name ||
        email ||
        "U";

    return value
        .trim()
        .charAt(0)
        .toUpperCase();
}


function getUserName(user) {

    if (!user) {
        return "Usuário";
    }

    return (
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Usuário"
    );
}


/* =========================================================
   STATUS DA CONEXÃO
========================================================= */

async function checkSupabaseConnection() {

    try {

        const {
            data,
            error
        } = await supabaseClient.auth.getSession();

        if (error) {
            throw error;
        }

        connectionDot.classList.add("online");

        connectionText.textContent =
            "Supabase conectado";

        return true;

    } catch (error) {

        console.error(
            "Erro na conexão Supabase:",
            error
        );

        connectionDot.classList.remove("online");
        connectionDot.classList.add("offline");

        connectionText.textContent =
            "Erro na conexão";

        return false;
    }
}


/* =========================================================
   MOSTRAR APLICAÇÃO
========================================================= */

async function showApp(user) {

    loginScreen.classList.add("hidden");

    appScreen.classList.remove("hidden");

    updateUserInterface(user);

    await checkSupabaseConnection();

    await loadDashboard();
}


/* =========================================================
   MOSTRAR LOGIN
========================================================= */

function showLogin() {

    appScreen.classList.add("hidden");

    loginScreen.classList.remove("hidden");

    loginForm.reset();

    loginMessage.textContent = "";

    loginMessage.className = "message";
}


/* =========================================================
   ATUALIZAR INTERFACE DO USUÁRIO
========================================================= */

function updateUserInterface(user) {

    if (!user) {
        return;
    }

    const name =
        getUserName(user);

    const email =
        user.email || "—";

    const initial =
        getInitial(name, email);


    document.getElementById(
        "userName"
    ).textContent = name;


    document.getElementById(
        "userEmail"
    ).textContent = email;


    document.getElementById(
        "userAvatar"
    ).textContent = initial;


    document.getElementById(
        "profileName"
    ).textContent = name;


    document.getElementById(
        "profileEmail"
    ).textContent = email;


    document.getElementById(
        "profileId"
    ).textContent = user.id;


    document.getElementById(
        "profileAvatar"
    ).textContent = initial;
}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const password =
            document.getElementById(
                "password"
            ).value;


        const button =
            loginForm.querySelector(
                ".btn-primary"
            );


        button.disabled = true;

        button.textContent =
            "Entrando...";

        showLoginMessage("");


        try {

            const {
                data,
                error
            } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });


            if (error) {
                throw error;
            }


            if (!data.session) {

                throw new Error(
                    "Não foi possível criar a sessão."
                );
            }


            showLoginMessage(
                "Login realizado com sucesso!",
                "success"
            );


            await showApp(data.user);


        } catch (error) {

            console.error(error);

            let message =
                "Não foi possível entrar.";

            if (
                error.message
                ?.toLowerCase()
                .includes("invalid login credentials")
            ) {

                message =
                    "E-mail ou senha incorretos.";

            } else if (
                error.message
                ?.toLowerCase()
                .includes("email not confirmed")
            ) {

                message =
                    "Seu e-mail ainda não foi confirmado.";

            } else if (error.message) {

                message =
                    error.message;
            }


            showLoginMessage(
                message,
                "error"
            );


        } finally {

            button.disabled = false;

            button.textContent =
                "Entrar";
        }
    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async function () {

        logoutButton.disabled = true;

        logoutButton.textContent =
            "Saindo...";


        try {

            const {
                error
            } = await supabaseClient.auth.signOut();

            if (error) {
                throw error;
            }

            showLogin();


        } catch (error) {

            console.error(
                "Erro ao sair:",
                error
            );

            alert(
                "Não foi possível sair. Tente novamente."
            );

        } finally {

            logoutButton.disabled = false;

            logoutButton.textContent =
                "⇥ Sair";
        }
    }
);


/* =========================================================
   RECUPERAÇÃO DE SENHA
========================================================= */

forgotPassword.addEventListener(
    "click",
    function () {

        recoveryEmail.value =
            document.getElementById(
                "email"
            ).value.trim();

        recoveryMessage.textContent = "";

        recoveryMessage.className =
            "message";

        passwordModal.classList.remove(
            "hidden"
        );
    }
);


closeModal.addEventListener(
    "click",
    function () {

        passwordModal.classList.add(
            "hidden"
        );
    }
);


passwordModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === passwordModal
        ) {

            passwordModal.classList.add(
                "hidden"
            );
        }
    }
);


sendRecovery.addEventListener(
    "click",
    async function () {

        const email =
            recoveryEmail.value.trim();


        if (!email) {

            showRecoveryMessage(
                "Digite seu e-mail."
            );

            return;
        }


        sendRecovery.disabled = true;

        sendRecovery.textContent =
            "Enviando...";


        try {

            const redirectUrl =
                window.location.origin +
                window.location.pathname;


            const {
                error
            } =
                await supabaseClient.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo: redirectUrl
                    }
                );


            if (error) {
                throw error;
            }


            showRecoveryMessage(
                "Se o e-mail estiver cadastrado, você receberá as instruções.",
                "success"
            );


        } catch (error) {

            console.error(error);

            showRecoveryMessage(
                error.message ||
                "Não foi possível enviar o e-mail."
            );


        } finally {

            sendRecovery.disabled = false;

            sendRecovery.textContent =
                "Enviar recuperação";
        }
    }
);


/* =========================================================
   MENU
========================================================= */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


const sections = {

    dashboard: {
        element: "dashboardSection",
        title: "Dashboard",
        subtitle: "Visão geral do sistema"
    },

    motores: {
        element: "motoresSection",
        title: "Motores",
        subtitle: "Equipamentos e ativos"
    },

    ordens: {
        element: "ordensSection",
        title: "Ordens de Serviço",
        subtitle: "Controle da manutenção"
    },

    checklists: {
        element: "checklistsSection",
        title: "Checklists",
        subtitle: "Inspeções e rotinas"
    },

    usuarios: {
        element: "usuariosSection",
        title: "Usuários",
        subtitle: "Controle de acesso"
    },

    perfil: {
        element: "perfilSection",
        title: "Meu Perfil",
        subtitle: "Informações da conta"
    }

};


menuItems.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const section =
                    button.dataset.section;

                openSection(section);

                sidebar.classList.remove(
                    "mobile-open"
                );
            }
        );
    }
);


function openSection(sectionName) {

    const section =
        sections[sectionName];

    if (!section) {
        return;
    }


    document
        .querySelectorAll(".page-section")
        .forEach(
            function (element) {

                element.classList.remove(
                    "active-section"
                );
            }
        );


    document
        .getElementById(section.element)
        .classList.add(
            "active-section"
        );


    menuItems.forEach(
        function (item) {

            item.classList.toggle(
                "active",
                item.dataset.section ===
                sectionName
            );
        }
    );


    document.getElementById(
        "pageTitle"
    ).textContent =
        section.title;


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        section.subtitle;
}


/* =========================================================
   MENU MOBILE
========================================================= */

mobileMenuButton.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "mobile-open"
        );
    }
);


/* =========================================================
   DASHBOARD
========================================================= */

async function loadDashboard() {

    /*
       Nesta primeira versão ainda não vamos consultar
       tabelas de motores, OS ou checklists.

       Isso evita erros enquanto as tabelas do GRID-X
       ainda não foram criadas.
    */


    document.getElementById(
        "motorCount"
    ).textContent = "0";


    document.getElementById(
        "osCount"
    ).textContent = "0";


    document.getElementById(
        "checklistCount"
    ).textContent = "0";


    document.getElementById(
        "profileStatus"
    ).textContent = "Ativo";


    document.getElementById(
        "supabaseStatus"
    ).textContent = "Conectado";


    document.getElementById(
        "authStatus"
    ).textContent = "Verificada";


    document.getElementById(
        "sessionStatus"
    ).textContent = "Ativa";
}


/* =========================================================
   OBSERVAR ALTERAÇÕES DE AUTENTICAÇÃO
========================================================= */

supabaseClient.auth.onAuthStateChange(
    async function (event, session) {

        console.log(
            "Evento de autenticação:",
            event
        );


        if (session?.user) {

            updateUserInterface(
                session.user
            );

        } else {

            showLogin();
        }
    }
);


/* =========================================================
   VERIFICAR SESSÃO AO ABRIR
========================================================= */

async function initializeApplication() {

    console.log(
        "Inicializando GRID-X CONTROL..."
    );


    const connected =
        await checkSupabaseConnection();


    if (!connected) {

        showLoginMessage(
            "Não foi possível conectar ao Supabase."
        );

        return;
    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {
            throw error;
        }


        if (data.session?.user) {

            await showApp(
                data.session.user
            );

        } else {

            showLogin();
        }


    } catch (error) {

        console.error(
            "Erro ao verificar sessão:",
            error
        );

        showLogin();
    }
}


/* =========================================================
   INICIAR SISTEMA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeApplication();

    }
);
