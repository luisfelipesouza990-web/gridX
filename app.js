/* =========================================================
   GRID-X CONTROL
   APP.JS — VERSÃO COMPLETA
   Navegação + Supabase + Dashboard
========================================================= */

"use strict";


/* =========================================================
   CONFIGURAÇÃO SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://fshnewxgiskenkkgfbnv.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Uy4h5ag9SKPOUwhY4yS6dQ_1EpsrnZ1";


/* =========================================================
   SUPABASE
   O sistema continua funcionando mesmo se a conexão falhar.
========================================================= */

let supabaseClient = null;

try {

    if (
        window.supabase &&
        typeof window.supabase.createClient === "function"
    ) {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );

        console.log(
            "GRID-X CONTROL: Supabase inicializado."
        );

    } else {

        console.warn(
            "GRID-X CONTROL: biblioteca Supabase não encontrada."
        );

    }

} catch (error) {

    console.error(
        "GRID-X CONTROL: erro ao iniciar Supabase:",
        error
    );

}


/* =========================================================
   CONFIGURAÇÃO DAS PÁGINAS
========================================================= */

const pageConfig = {

    dashboard: {
        title: "Dashboard",
        subtitle: "Visão geral do ecossistema GRID-X"
    },

    ai: {
        title: "GRID-X AI",
        subtitle: "Inteligência artificial aplicada à energia"
    },

    energia: {
        title: "Gestão de Energia",
        subtitle: "Geração, consumo, armazenamento e eficiência"
    },

    ativos: {
        title: "Ativos Energéticos",
        subtitle: "Gestão dos ativos do ecossistema GRID-X"
    },

    mercado: {
        title: "Mercado de Energia",
        subtitle: "Mercado Digital de Energia"
    },

    v2g: {
        title: "Vehicle-to-Grid — V2G",
        subtitle: "Integração entre veículos elétricos e rede"
    },

    sustentabilidade: {
        title: "Sustentabilidade & ESG",
        subtitle: "Indicadores ambientais, sociais e de governança"
    },

    projetos: {
        title: "Projetos & Inovação",
        subtitle: "Pesquisa, desenvolvimento e novas soluções"
    },

    relatorios: {
        title: "Relatórios",
        subtitle: "Indicadores estratégicos do ecossistema GRID-X"
    },

    usuarios: {
        title: "Usuários",
        subtitle: "Gestão dos usuários da plataforma GRID-X"
    },

    perfil: {
        title: "Meu Perfil",
        subtitle: "Informações do acesso à plataforma GRID-X"
    }

};


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

let menuItems = [];
let pageSections = [];

let pageTitle = null;
let pageSubtitle = null;

let sidebar = null;
let mobileMenuButton = null;


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


function initializeApp() {

    console.log(
        "GRID-X CONTROL: iniciando aplicação..."
    );


    /* -----------------------------------------------------
       ELEMENTOS
    ----------------------------------------------------- */

    menuItems =
        Array.from(
            document.querySelectorAll(
                ".menu-item[data-section]"
            )
        );


    pageSections =
        Array.from(
            document.querySelectorAll(
                ".page-section"
            )
        );


    pageTitle =
        document.getElementById(
            "pageTitle"
        );


    pageSubtitle =
        document.getElementById(
            "pageSubtitle"
        );


    sidebar =
        document.getElementById(
            "sidebar"
        );


    mobileMenuButton =
        document.getElementById(
            "mobileMenuButton"
        );


    /* -----------------------------------------------------
       VERIFICAÇÃO
    ----------------------------------------------------- */

    console.log(
        "GRID-X CONTROL:",
        menuItems.length,
        "menus encontrados."
    );

    console.log(
        "GRID-X CONTROL:",
        pageSections.length,
        "seções encontradas."
    );


    /* -----------------------------------------------------
       MENU
    ----------------------------------------------------- */

    setupNavigation();


    /* -----------------------------------------------------
       MENU MOBILE
    ----------------------------------------------------- */

    setupMobileMenu();


    /* -----------------------------------------------------
       BOTÕES
    ----------------------------------------------------- */

    setupActionButtons();


    /* -----------------------------------------------------
       PERFIL
    ----------------------------------------------------- */

    setupLocalProfile();


    /* -----------------------------------------------------
       DASHBOARD
    ----------------------------------------------------- */

    updateDashboard();


    /* -----------------------------------------------------
       SUPABASE
    ----------------------------------------------------- */

    checkSupabaseConnection();


    /* -----------------------------------------------------
       PÁGINA INICIAL
    ----------------------------------------------------- */

    showSection(
        "dashboard"
    );


    console.log(
        "GRID-X CONTROL: aplicação pronta."
    );

}


/* =========================================================
   NAVEGAÇÃO PRINCIPAL
========================================================= */

function setupNavigation() {

    if (!menuItems.length) {

        console.error(
            "GRID-X CONTROL: nenhum botão de menu encontrado."
        );

        return;
    }


    menuItems.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const section =
                        button.getAttribute(
                            "data-section"
                        );


                    if (!section) {

                        console.warn(
                            "Botão sem data-section."
                        );

                        return;
                    }


                    console.log(
                        "Abrindo seção:",
                        section
                    );


                    showSection(
                        section
                    );


                    closeMobileMenu();

                }
            );

        }
    );

}


/* =========================================================
   MOSTRAR SEÇÃO
========================================================= */

function showSection(sectionName) {

    const section =
        document.getElementById(
            sectionName + "Section"
        );


    if (!section) {

        console.error(
            "GRID-X CONTROL: seção não encontrada:",
            sectionName + "Section"
        );

        return;
    }


    /* -----------------------------------------------------
       ESCONDER TODAS
    ----------------------------------------------------- */

    pageSections.forEach(
        function (item) {

            item.classList.remove(
                "active-section"
            );

        }
    );


    /* -----------------------------------------------------
       MOSTRAR SEÇÃO ESCOLHIDA
    ----------------------------------------------------- */

    section.classList.add(
        "active-section"
    );


    /* -----------------------------------------------------
       ATUALIZAR MENU
    ----------------------------------------------------- */

    menuItems.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );


            if (
                item.getAttribute(
                    "data-section"
                ) === sectionName
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    /* -----------------------------------------------------
       ATUALIZAR TOPBAR
    ----------------------------------------------------- */

    const config =
        pageConfig[
            sectionName
        ];


    if (
        config &&
        pageTitle &&
        pageSubtitle
    ) {

        pageTitle.textContent =
            config.title;

        pageSubtitle.textContent =
            config.subtitle;

    }


    /* -----------------------------------------------------
       ROLAR PARA O TOPO
    ----------------------------------------------------- */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   MENU MOBILE
========================================================= */

function setupMobileMenu() {

    if (
        !mobileMenuButton ||
        !sidebar
    ) {

        return;
    }


    mobileMenuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );


    /* Fechar ao clicar fora */

    document.addEventListener(
        "click",
        function (event) {

            const isMobile =
                window.innerWidth <= 750;


            if (!isMobile) {
                return;
            }


            const clickedInsideSidebar =
                sidebar.contains(
                    event.target
                );


            const clickedMenuButton =
                mobileMenuButton.contains(
                    event.target
                );


            if (
                !clickedInsideSidebar &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   FECHAR MENU MOBILE
========================================================= */

function closeMobileMenu() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.remove(
        "mobile-open"
    );

}


/* =========================================================
   BOTÕES DE AÇÃO
========================================================= */

function setupActionButtons() {

    const buttons =
        document.querySelectorAll(
            ".btn-primary"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const text =
                        button.textContent
                            .trim();


                    console.log(
                        "GRID-X CONTROL:",
                        text
                    );


                    showActionMessage(
                        text
                    );

                }
            );

        }
    );

}


/* =========================================================
   MENSAGEM TEMPORÁRIA
========================================================= */

function showActionMessage(
    buttonText
) {

    let message =
        document.getElementById(
            "gridxActionMessage"
        );


    if (!message) {

        message =
            document.createElement(
                "div"
            );


        message.id =
            "gridxActionMessage";


        message.style.position =
            "fixed";

        message.style.right =
            "20px";

        message.style.bottom =
            "20px";

        message.style.zIndex =
            "5000";

        message.style.background =
            "#111827";

        message.style.color =
            "#ffffff";

        message.style.padding =
            "14px 18px";

        message.style.borderRadius =
            "10px";

        message.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.2)";

        message.style.fontSize =
            "13px";

        message.style.maxWidth =
            "320px";


        document.body.appendChild(
            message
        );

    }


    message.textContent =
        buttonText +
        " — módulo preparado para integração.";


    message.style.display =
        "block";


    clearTimeout(
        window.gridxMessageTimer
    );


    window.gridxMessageTimer =
        setTimeout(
            function () {

                message.style.display =
                    "none";

            },
            3000
        );

}


/* =========================================================
   PERFIL LOCAL
========================================================= */

function setupLocalProfile() {

    const profile = {

        name:
            localStorage.getItem(
                "gridx_user_name"
            ) ||
            "Operador GRID-X",

        email:
            localStorage.getItem(
                "gridx_user_email"
            ) ||
            "Acesso direto",

        id:
            localStorage.getItem(
                "gridx_user_id"
            ) ||
            "grid-x-local"

    };


    updateElement(
        "userName",
        profile.name
    );


    updateElement(
        "userEmail",
        profile.email
    );


    updateElement(
        "profileName",
        profile.name
    );


    updateElement(
        "profileEmail",
        profile.email
    );


    updateElement(
        "profileId",
        profile.id
    );


    const firstLetter =
        getInitial(
            profile.name
        );


    updateElement(
        "userAvatar",
        firstLetter
    );


    updateElement(
        "profileAvatar",
        firstLetter
    );

}


/* =========================================================
   INICIAL DO NOME
========================================================= */

function getInitial(name) {

    if (!name) {
        return "G";
    }


    return name
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =========================================================
   ATUALIZAR ELEMENTO
========================================================= */

function updateElement(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    updateElement(
        "energyGenerated",
        "0 kWh"
    );


    updateElement(
        "energyStored",
        "0 kWh"
    );


    updateElement(
        "co2Avoided",
        "0 kg"
    );


    updateElement(
        "aiStatus",
        "Online"
    );


    updateElement(
        "predictionCount",
        "0"
    );


    updateElement(
        "anomalyCount",
        "0"
    );

}


/* =========================================================
   CONEXÃO SUPABASE
========================================================= */

async function checkSupabaseConnection() {

    const statusElement =
        document.getElementById(
            "systemStatus"
        );


    if (!supabaseClient) {

        console.warn(
            "GRID-X CONTROL: Supabase indisponível."
        );

        if (statusElement) {

            statusElement.textContent =
                "Modo local";

        }

        return false;
    }


    try {

        /*
         * Não fazemos uma consulta obrigatória
         * em tabela específica.
         *
         * Isso evita que o aplicativo quebre caso
         * as tabelas ainda não tenham sido criadas.
         */

        const response =
            await fetch(
                SUPABASE_URL +
                "/rest/v1/",
                {
                    method: "GET",

                    headers: {
                        apikey:
                            SUPABASE_KEY,

                        Authorization:
                            "Bearer " +
                            SUPABASE_KEY
                    }
                }
            );


        if (
            response.ok ||
            response.status === 404
        ) {

            console.log(
                "GRID-X CONTROL: conexão com Supabase disponível."
            );


            if (statusElement) {

                statusElement.textContent =
                    "Operacional";

            }


            return true;

        }


        throw new Error(
            "HTTP " +
            response.status
        );


    } catch (error) {

        console.warn(
            "GRID-X CONTROL: não foi possível validar o Supabase.",
            error
        );


        /*
         * O aplicativo continua funcionando.
         */

        if (statusElement) {

            statusElement.textContent =
                "Modo local";

        }


        return false;

    }

}


/* =========================================================
   FUNÇÃO PARA CONSULTAR TABELAS FUTURAMENTE
========================================================= */

async function loadTable(
    tableName
) {

    if (!supabaseClient) {

        console.warn(
            "Supabase não está disponível."
        );

        return [];

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from(tableName)
                .select("*");


        if (error) {

            console.error(
                "Erro ao consultar " +
                tableName +
                ":",
                error
            );

            return [];

        }


        return data || [];


    } catch (error) {

        console.error(
            "Erro inesperado:",
            error
        );

        return [];

    }

}


/* =========================================================
   EXPORTAR PARA OUTROS SCRIPTS
========================================================= */

window.GRIDX = {

    supabase:
        function () {

            return supabaseClient;

        },

    showSection:
        showSection,

    loadTable:
        loadTable,

    updateDashboard:
        updateDashboard

};


console.log(
    "GRID-X CONTROL app.js carregado."
);
