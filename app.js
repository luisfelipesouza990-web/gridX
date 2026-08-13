```javascript
/* ============================================================
   GRID-X CONTROL
   app.js
   Plataforma de Energia, IA, Sustentabilidade e Inovação
   ============================================================ */


/* ============================================================
   CONFIGURAÇÃO SUPABASE
   ============================================================ */

const SUPABASE_URL = "https://fshnewxgiskenkkgfbnv.supabase.co";

/*
   IMPORTANTE:
   Coloque aqui a ANON KEY / Publishable Key do seu projeto.

   Nunca coloque a service_role key neste arquivo.
*/

const SUPABASE_ANON_KEY = "COLE_AQUI_SUA_ANON_KEY";


let supabaseClient = null;


/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    inicializarSupabase();

    inicializarNavegacao();

    inicializarMenuMobile();

    carregarDados();

});


/* ============================================================
   SUPABASE
   ============================================================ */

function inicializarSupabase() {

    try {

        if (
            typeof window.supabase === "undefined"
        ) {

            console.warn(
                "Biblioteca Supabase não encontrada."
            );

            atualizarStatusSupabase(false);

            return;

        }


        if (
            !SUPABASE_URL ||
            !SUPABASE_ANON_KEY ||
            SUPABASE_ANON_KEY === "COLE_AQUI_SUA_ANON_KEY"
        ) {

            console.warn(
                "Configure a SUPABASE_ANON_KEY no app.js."
            );

            atualizarStatusSupabase(false);

            return;

        }


        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );


        atualizarStatusSupabase(true);


        console.log(
            "GRID-X CONTROL conectado ao Supabase."
        );


    } catch (error) {

        console.error(
            "Erro ao inicializar Supabase:",
            error
        );

        atualizarStatusSupabase(false);

    }

}


/* ============================================================
   NAVEGAÇÃO
   ============================================================ */

function inicializarNavegacao() {

    const menuItems = document.querySelectorAll(
        ".menu-item"
    );


    menuItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const sectionName =
                    item.dataset.section;

                abrirSecao(sectionName);

            }
        );

    });

}


/* ============================================================
   ABRIR SEÇÃO
   ============================================================ */

function abrirSecao(sectionName) {

    const sections = document.querySelectorAll(
        ".page-section"
    );


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const menuItems = document.querySelectorAll(
        ".menu-item"
    );


    menuItems.forEach(item => {

        item.classList.remove(
            "active"
        );

    });


    const targetSection =
        document.getElementById(
            `${sectionName}Section`
        );


    if (!targetSection) {

        console.warn(
            `Seção não encontrada: ${sectionName}`
        );

        return;

    }


    targetSection.classList.add(
        "active-section"
    );


    const activeMenu =
        document.querySelector(
            `.menu-item[data-section="${sectionName}"]`
        );


    if (activeMenu) {

        activeMenu.classList.add(
            "active"
        );

    }


    atualizarCabecalho(
        sectionName
    );


    fecharMenuMobile();

}


/* ============================================================
   TÍTULOS DAS SEÇÕES
   ============================================================ */

const sectionInfo = {

    dashboard: {

        title: "Dashboard",

        subtitle:
            "Visão geral do ecossistema GRID-X"

    },


    ai: {

        title: "GRID-X AI",

        subtitle:
            "Inteligência artificial e análise energética"

    },


    energia: {

        title: "Energia",

        subtitle:
            "Monitoramento da geração, consumo e eficiência"

    },


    ativos: {

        title: "Ativos Energéticos",

        subtitle:
            "Gestão dos ativos do ecossistema GRID-X"

    },


    mercado: {

        title: "Mercado de Energia",

        subtitle:
            "Gestão e visualização do mercado digital de energia"

    },


    v2g: {

        title: "V2G",

        subtitle:
            "Integração entre veículos elétricos e rede"

    },


    sustentabilidade: {

        title: "Sustentabilidade",

        subtitle:
            "Indicadores ambientais, sociais e de governança"

    },


    projetos: {

        title: "Projetos & Inovação",

        subtitle:
            "Pesquisa, desenvolvimento e novas tecnologias"

    },


    relatorios: {

        title: "Relatórios",

        subtitle:
            "Indicadores e informações estratégicas"

    },


    usuarios: {

        title: "Usuários",

        subtitle:
            "Gerenciamento dos usuários da plataforma"

    },


    perfil: {

        title: "Meu Perfil",

        subtitle:
            "Informações do acesso à plataforma"

    }

};


/* ============================================================
   ATUALIZAR CABEÇALHO
   ============================================================ */

function atualizarCabecalho(
    sectionName
) {

    const titleElement =
        document.getElementById(
            "pageTitle"
        );


    const subtitleElement =
        document.getElementById(
            "pageSubtitle"
        );


    const info =
        sectionInfo[sectionName];


    if (!info) {

        return;

    }


    if (titleElement) {

        titleElement.textContent =
            info.title;

    }


    if (subtitleElement) {

        subtitleElement.textContent =
            info.subtitle;

    }

}


/* ============================================================
   MENU MOBILE
   ============================================================ */

function inicializarMenuMobile() {

    const button =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!button || !sidebar) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* ============================================================
   FECHAR MENU MOBILE
   ============================================================ */

function fecharMenuMobile() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!sidebar) {

        return;

    }


    sidebar.classList.remove(
        "mobile-open"
    );

}


/* ============================================================
   STATUS SUPABASE
   ============================================================ */

function atualizarStatusSupabase(
    conectado
) {

    const element =
        document.getElementById(
            "supabaseStatus"
        );


    if (!element) {

        return;

    }


    if (conectado) {

        element.textContent =
            "Conectado";

        element.classList.remove(
            "status-error"
        );

        element.classList.add(
            "status-ok"
        );

    } else {

        element.textContent =
            "Não configurado";

        element.classList.remove(
            "status-ok"
        );

        element.classList.add(
            "status-error"
        );

    }

}


/* ============================================================
   CARREGAR DADOS
   ============================================================ */

async function carregarDados() {

    if (!supabaseClient) {

        console.log(
            "Supabase ainda não configurado."
        );

        return;

    }


    await carregarAtivos();

    await carregarPredicoes();

    await carregarDadosEnergia();

    await carregarV2G();

    await carregarSustentabilidade();

}


/* ============================================================
   ATIVOS ENERGÉTICOS
   ============================================================ */

async function carregarAtivos() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("ativos_energeticos")
            .select("*");


        if (error) {

            console.warn(
                "Tabela ativos_energeticos:",
                error.message
            );

            return;

        }


        const quantidade =
            data?.length || 0;


        console.log(
            "Ativos encontrados:",
            quantidade
        );


    } catch (error) {

        console.error(
            "Erro ao carregar ativos:",
            error
        );

    }

}


/* ============================================================
   GRID-X AI
   ============================================================ */

async function carregarPredicoes() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("ai_predictions")
            .select("*");


        if (error) {

            console.warn(
                "Tabela ai_predictions:",
                error.message
            );

            return;

        }


        const total =
            data?.length || 0;


        atualizarTexto(
            "predictionCount",
            total
        );


        const anomalias =
            data
                ? data.filter(
                    item =>
                        item.type === "anomaly" ||
                        item.prediction_type === "anomaly"
                ).length
                : 0;


        atualizarTexto(
            "anomalyCount",
            anomalias
        );


    } catch (error) {

        console.error(
            "Erro ao carregar IA:",
            error
        );

    }

}


/* ============================================================
   DADOS DE ENERGIA
   ============================================================ */

async function carregarDadosEnergia() {

    try {

        /*
           Esta função tenta utilizar a tabela
           "geracao_energia".

           Se a tabela ainda não existir,
           o sistema simplesmente mantém os
           indicadores em zero.
        */


        const {
            data,
            error
        } = await supabaseClient
            .from("geracao_energia")
            .select("*");


        if (error) {

            console.warn(
                "Tabela geracao_energia:",
                error.message
            );

            return;

        }


        if (!data || data.length === 0) {

            return;

        }


        let totalGerado = 0;


        data.forEach(item => {

            const valor =
                Number(
                    item.energy_kwh ??
                    item.energia_kwh ??
                    item.generation_kwh ??
                    item.valor ??
                    0
                );


            if (!Number.isNaN(valor)) {

                totalGerado += valor;

            }

        });


        const valorFormatado =
            formatarNumero(
                totalGerado
            );


        atualizarTexto(
            "energyGenerated",
            `${valorFormatado} kWh`
        );


    } catch (error) {

        console.error(
            "Erro ao carregar energia:",
            error
        );

    }

}


/* ============================================================
   V2G
   ============================================================ */

async function carregarV2G() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("v2g")
            .select("*");


        if (error) {

            console.warn(
                "Tabela v2g:",
                error.message
            );

            return;

        }


        const quantidade =
            data?.length || 0;


        console.log(
            "Registros V2G:",
            quantidade
        );


    } catch (error) {

        console.error(
            "Erro ao carregar V2G:",
            error
        );

    }

}


/* ============================================================
   SUSTENTABILIDADE
   ============================================================ */

async function carregarSustentabilidade() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("indicadores_esg")
            .select("*");


        if (error) {

            console.warn(
                "Tabela indicadores_esg:",
                error.message
            );

            return;

        }


        if (!data || data.length === 0) {

            return;

        }


        let co2Total = 0;


        data.forEach(item => {

            const valor =
                Number(
                    item.co2_avoided ??
                    item.co2_evitado ??
                    item.valor_co2 ??
                    0
                );


            if (!Number.isNaN(valor)) {

                co2Total += valor;

            }

        });


        atualizarTexto(
            "co2Avoided",
            `${formatarNumero(co2Total)} kg`
        );


    } catch (error) {

        console.error(
            "Erro ao carregar sustentabilidade:",
            error
        );

    }

}


/* ============================================================
   FUNÇÃO AUXILIAR — ATUALIZAR TEXTO
   ============================================================ */

function atualizarTexto(
    id,
    valor
) {

    const element =
        document.getElementById(id);


    if (!element) {

        return;

    }


    element.textContent =
        valor;

}


/* ============================================================
   FORMATAÇÃO DE NÚMEROS
   ============================================================ */

function formatarNumero(
    numero
) {

    return Number(
        numero || 0
    ).toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    );

}


/* ============================================================
   SISTEMA ONLINE
   ============================================================ */

function atualizarSistemaOnline() {

    const status =
        document.getElementById(
            "sessionStatus"
        );


    if (!status) {

        return;

    }


    status.textContent =
        "Ativo";

}


/* ============================================================
   RELÓGIO / ATUALIZAÇÃO PERIÓDICA
   ============================================================ */

setInterval(
    () => {

        atualizarSistemaOnline();

    },
    30000
);


/* ============================================================
   API GLOBAL
   Permite que outros arquivos utilizem funções do sistema.
   ============================================================ */

window.GRIDX = {

    abrirSecao,

    carregarDados,

    carregarAtivos,

    carregarPredicoes,

    carregarDadosEnergia,

    carregarV2G,

    carregarSustentabilidade

};


/* ============================================================
   FIM DO APP.JS
   ============================================================ */
```
