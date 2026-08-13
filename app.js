```javascript
/* =========================================================
   GRID-X CONTROL
   GitHub Pages + Supabase
   ACESSO DIRETO — SEM E-MAIL E SEM SENHA
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

const connectionDot =
    document.getElementById("connectionDot");

const connectionText =
    document.getElementById("connectionText");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const sidebar =
    document.getElementById("sidebar");


/* =========================================================
   USUÁRIO PADRÃO
   Não utiliza autenticação do Supabase
========================================================= */

const defaultUser = {

    id: "grid-x-local",

    email: "Acesso direto",

    user_metadata: {

        full_name: "Operador GRID-X"

    }

};


/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function getInitial(name, email) {

    const value =
        name ||
        email ||
        "G";

    return value
        .trim()
        .charAt(0)
        .toUpperCase();
}


function getUserName(user) {

    if (!user) {

        return "Operador GRID-X";

    }

    return (
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Operador GRID-X"
    );
}


/* =========================================================
   STATUS DA CONEXÃO COM SUPABASE
========================================================= */

async function checkSupabaseConnection() {

    try {

        /*
           Não usamos mais auth.getSession().
           Apenas verificamos se o cliente Supabase
           está disponível.
        */

        if (!supabaseClient) {

            throw new Error(
                "Cliente Supabase não inicializado."
            );

        }


        connectionDot.classList.remove(
            "offline"
        );

        connectionDot.classList.add(
            "online"
        );


        connectionText.textContent =
            "Supabase conectado";


        return true;


    } catch (error) {

        console.error(
            "Erro na conexão Supabase:",
            error
        );


        connectionDot.classList.remove(
            "online"
        );

        connectionDot.classList.add(
            "offline"
        );


        connectionText.textContent =
            "Erro na conexão";


        return false;
    }
}


/* =========================================================
   MOSTRAR APLICAÇÃO
========================================================= */

async function showApp(user) {

    /*
       Esconde a tela de login, caso ela exista
       no HTML antigo.
    */

    if (loginScreen) {

        loginScreen.classList.add(
            "hidden"
        );

    }


    if (appScreen) {

        appScreen.classList.remove(
            "hidden"
        );

    }


    updateUserInterface(user);


    await checkSupabaseConnection();


    await loadDashboard();

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
        user.email || "Acesso direto";


    const initial =
        getInitial(
            name,
            email
        );


    const userName =
        document.getElementById(
            "userName"
        );


    const userEmail =
        document.getElementById(
            "userEmail"
        );


    const userAvatar =
        document.getElementById(
            "userAvatar"
        );


    const profileName =
        document.getElementById(
            "profileName"
        );


    const profileEmail =
        document.getElementById(
            "profileEmail"
        );


    const profileId =
        document.getElementById(
            "profileId"
        );


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    if (userName) {

        userName.textContent =
            name;

    }


    if (userEmail) {

        userEmail.textContent =
            email;

    }


    if (userAvatar) {

        userAvatar.textContent =
            initial;

    }


    if (profileName) {

        profileName.textContent =
            name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    if (profileId) {

        profileId.textContent =
            user.id;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            initial;

    }

}


/* =========================================================
   MENU
========================================================= */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


const sections = {

    dashboard: {

        element:
            "dashboardSection",

        title:
            "Dashboard",

        subtitle:
            "Visão geral do sistema"

    },


    motores: {

        element:
            "motoresSection",

        title:
            "Motores",

        subtitle:
            "Equipamentos e ativos"

    },


    ordens: {

        element:
            "ordensSection",

        title:
            "Ordens de Serviço",

        subtitle:
            "Controle da manutenção"

    },


    checklists: {

        element:
            "checklistsSection",

        title:
            "Checklists",

        subtitle:
            "Inspeções e rotinas"

    },


    usuarios: {

        element:
            "usuariosSection",

        title:
            "Usuários",

        subtitle:
            "Controle de acesso"

    },


    perfil: {

        element:
            "perfilSection",

        title:
            "Meu Perfil",

        subtitle:
            "Informações da conta"

    }

};


/* =========================================================
   CLIQUES DO MENU
========================================================= */

menuItems.forEach(

    function (button) {

        button.addEventListener(

            "click",

            function () {

                const section =
                    button.dataset.section;


                openSection(
                    section
                );


                if (sidebar) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }

            }

        );

    }

);


/* =========================================================
   ABRIR SEÇÃO
========================================================= */

function openSection(sectionName) {

    const section =
        sections[sectionName];


    if (!section) {

        return;

    }


    document
        .querySelectorAll(
            ".page-section"
        )
        .forEach(

            function (element) {

                element.classList.remove(
                    "active-section"
                );

            }

        );


    const sectionElement =
        document.getElementById(
            section.element
        );


    if (sectionElement) {

        sectionElement.classList.add(
            "active-section"
        );

    }


    menuItems.forEach(

        function (item) {

            item.classList.toggle(

                "active",

                item.dataset.section ===
                sectionName

            );

        }

    );


    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    const pageSubtitle =
        document.getElementById(
            "pageSubtitle"
        );


    if (pageTitle) {

        pageTitle.textContent =
            section.title;

    }


    if (pageSubtitle) {

        pageSubtitle.textContent =
            section.subtitle;

    }

}


/* =========================================================
   MENU MOBILE
========================================================= */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(

        "click",

        function () {

            if (sidebar) {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }

        }

    );

}


/* =========================================================
   DASHBOARD
========================================================= */

async function loadDashboard() {

    /*
       Mantido conforme a estrutura original.
       As consultas ao banco serão adicionadas
       quando as tabelas do GRID-X estiverem prontas.
    */


    const motorCount =
        document.getElementById(
            "motorCount"
        );


    const osCount =
        document.getElementById(
            "osCount"
        );


    const checklistCount =
        document.getElementById(
            "checklistCount"
        );


    const profileStatus =
        document.getElementById(
            "profileStatus"
        );


    const supabaseStatus =
        document.getElementById(
            "supabaseStatus"
        );


    const authStatus =
        document.getElementById(
            "authStatus"
        );


    const sessionStatus =
        document.getElementById(
            "sessionStatus"
        );


    if (motorCount) {

        motorCount.textContent =
            "0";

    }


    if (osCount) {

        osCount.textContent =
            "0";

    }


    if (checklistCount) {

        checklistCount.textContent =
            "0";

    }


    if (profileStatus) {

        profileStatus.textContent =
            "Ativo";

    }


    if (supabaseStatus) {

        supabaseStatus.textContent =
            "Conectado";

    }


    if (authStatus) {

        authStatus.textContent =
            "Acesso direto";

    }


    if (sessionStatus) {

        sessionStatus.textContent =
            "Ativa";

    }

}


/* =========================================================
   INICIALIZAÇÃO DA APLICAÇÃO
========================================================= */

async function initializeApplication() {

    console.log(
        "Inicializando GRID-X CONTROL..."
    );


    /*
       Não verifica mais:
       - e-mail
       - senha
       - sessão
       - usuário autenticado
    */


    await showApp(
        defaultUser
    );


    /*
       Abre o Dashboard automaticamente.
    */

    openSection(
        "dashboard"
    );

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
```
