```javascript
/* ============================================================
   GRID-X CONTROL
   APP.JS
   VERSÃO CORRIGIDA — NAVEGAÇÃO FORÇADA
   ============================================================ */


/* ============================================================
   SUPABASE
   ============================================================ */

const SUPABASE_URL =
    "https://fshnewxgiskenkkgfbnv.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Uy4h5ag9SKPOUwhY4yS6dQ_1EpsrnZ1";


let supabaseClient = null;


/* ============================================================
   INICIAR SISTEMA
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "GRID-X CONTROL carregando..."
        );


        iniciarSupabase();

        prepararMenu();

        prepararMenuMobile();

        abrirSecao("dashboard");

        carregarDados();


        console.log(
            "GRID-X CONTROL pronto."
        );

    }
);


/* ============================================================
   SUPABASE
   ============================================================ */

function iniciarSupabase() {

    try {

        if (
            typeof window.supabase ===
            "undefined"
        ) {

            console.error(
                "Supabase JS não carregado."
            );

            return;

        }


        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );


        const status =
            document.getElementById(
                "supabaseStatus"
            );


        if (status) {

            status.textContent =
                "Conectado";

            status.classList.remove(
                "status-error"
            );

            status.classList.add(
                "status-ok"
            );

        }


        console.log(
            "Supabase conectado."
        );


    } catch (erro) {

        console.error(
            "Erro no Supabase:",
            erro
        );

    }

}


/* ============================================================
   PREPARAR MENU
   ============================================================ */

function prepararMenu() {

    const botoes =
        document.querySelectorAll(
            ".menu-item"
        );


    console.log(
        "Quantidade de botões encontrados:",
        botoes.length
    );


    botoes.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();

                    evento.stopPropagation();


                    const secao =
                        botao.getAttribute(
                            "data-section"
                        );


                    console.log(
                        "Clique no menu:",
                        secao
                    );


                    if (
                        secao
                    ) {

                        abrirSecao(
                            secao
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   ABRIR SEÇÃO
   ============================================================ */

function abrirSecao(
    nome
) {

    console.log(
        "Abrindo seção:",
        nome
    );


    /* --------------------------------------------------------
       TODAS AS SEÇÕES
    -------------------------------------------------------- */

    const secoes =
        document.querySelectorAll(
            ".page-section"
        );


    secoes.forEach(
        function (secao) {

            secao.classList.remove(
                "active-section"
            );


            /*
               Usa !important para vencer
               qualquer regra do CSS.
            */

            secao.style.setProperty(
                "display",
                "none",
                "important"
            );

        }
    );


    /* --------------------------------------------------------
       TODOS OS BOTÕES
    -------------------------------------------------------- */

    const botoes =
        document.querySelectorAll(
            ".menu-item"
        );


    botoes.forEach(
        function (botao) {

            botao.classList.remove(
                "active"
            );

        }
    );


    /* --------------------------------------------------------
       ENCONTRAR SEÇÃO
    -------------------------------------------------------- */

    const secao =
        document.getElementById(
            nome + "Section"
        );


    if (!secao) {

        console.error(
            "ERRO: seção não encontrada:",
            nome + "Section"
        );

        return;

    }


    /* --------------------------------------------------------
       MOSTRAR SEÇÃO
    -------------------------------------------------------- */

    secao.classList.add(
        "active-section"
    );


    secao.style.setProperty(
        "display",
        "block",
        "important"
    );


    /* --------------------------------------------------------
       ATIVAR BOTÃO
    -------------------------------------------------------- */

    const botaoAtivo =
        document.querySelector(
            '.menu-item[data-section="' +
            nome +
            '"]'
        );


    if (botaoAtivo) {

        botaoAtivo.classList.add(
            "active"
        );

    }


    /* --------------------------------------------------------
       ATUALIZAR CABEÇALHO
    -------------------------------------------------------- */

    atualizarCabecalho(
        nome
    );


    /* --------------------------------------------------------
       FECHAR MENU MOBILE
    -------------------------------------------------------- */

    fecharMenuMobile();


    console.log(
        "Seção aberta com sucesso:",
        nome
    );

}


/* ============================================================
   TÍTULOS
   ============================================================ */

const paginas = {

    dashboard: [
        "Dashboard",
        "Visão geral do ecossistema GRID-X"
    ],

    ai: [
        "GRID-X AI",
        "Inteligência artificial e análise energética"
    ],

    energia: [
        "Energia",
        "Monitoramento da geração, consumo e eficiência"
    ],

    ativos: [
        "Ativos Energéticos",
        "Gestão dos ativos do ecossistema GRID-X"
    ],

    mercado: [
        "Mercado de Energia",
        "Gestão do mercado digital de energia"
    ],

    v2g: [
        "V2G",
        "Integração entre veículos elétricos e rede"
    ],

    sustentabilidade: [
        "Sustentabilidade",
        "Indicadores ambientais, sociais e de governança"
    ],

    projetos: [
        "Projetos & Inovação",
        "Pesquisa, desenvolvimento e novas tecnologias"
    ],

    relatorios: [
        "Relatórios",
        "Indicadores e informações estratégicas"
    ],

    usuarios: [
        "Usuários",
        "Gerenciamento dos usuários da plataforma"
    ],

    perfil: [
        "Meu Perfil",
        "Informações do acesso à plataforma"
    ]

};


/* ============================================================
   CABEÇALHO
   ============================================================ */

function atualizarCabecalho(
    nome
) {

    const pagina =
        paginas[nome];


    if (!pagina) {

        return;

    }


    const titulo =
        document.getElementById(
            "pageTitle"
        );


    const subtitulo =
        document.getElementById(
            "pageSubtitle"
        );


    if (titulo) {

        titulo.textContent =
            pagina[0];

    }


    if (subtitulo) {

        subtitulo.textContent =
            pagina[1];

    }

}


/* ============================================================
   MENU MOBILE
   ============================================================ */

function prepararMenuMobile() {

    const botao =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (
        !botao ||
        !sidebar
    ) {

        return;

    }


    botao.addEventListener(
        "click",
        function () {

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


    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );

    }

}


/* ============================================================
   CARREGAR DADOS
   ============================================================ */

async function carregarDados() {

    if (
        !supabaseClient
    ) {

        console.log(
            "Supabase indisponível. Sistema funcionando em modo local."
        );

        return;

    }


    try {

        await carregarAtivos();

        await carregarAI();

        await carregarEnergia();

        await carregarV2G();

        await carregarESG();

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

    }

}


/* ============================================================
   ATIVOS
   ============================================================ */

async function carregarAtivos() {

    try {

        const resultado =
            await supabaseClient
                .from(
                    "ativos_energeticos"
                )
                .select("*");


        if (
            resultado.error
        ) {

            console.warn(
                "Ativos:",
                resultado.error.message
            );

            return;

        }


        console.log(
            "Ativos:",
            resultado.data?.length || 0
        );


    } catch (erro) {

        console.warn(
            "Erro ativos:",
            erro
        );

    }

}


/* ============================================================
   GRID-X AI
   ============================================================ */

async function carregarAI() {

    try {

        const resultado =
            await supabaseClient
                .from(
                    "ai_predictions"
                )
                .select("*");


        if (
            resultado.error
        ) {

            console.warn(
                "AI:",
                resultado.error.message
            );

            return;

        }


        const dados =
            resultado.data || [];


        atualizarElemento(
            "predictionCount",
            dados.length
        );


        let anomalias =
            0;


        dados.forEach(
            function (item) {

                const tipo =
                    String(
                        item.type ||
                        item.prediction_type ||
                        item.tipo ||
                        ""
                    ).toLowerCase();


                if (
                    tipo.includes(
                        "anomaly"
                    ) ||
                    tipo.includes(
                        "anomalia"
                    )
                ) {

                    anomalias++;

                }

            }
        );


        atualizarElemento(
            "anomalyCount",
            anomalias
        );


    } catch (erro) {

        console.warn(
            "Erro AI:",
            erro
        );

    }

}


/* ============================================================
   ENERGIA
   ============================================================ */

async function carregarEnergia() {

    try {

        const resultado =
            await supabaseClient
                .from(
                    "geracao_energia"
                )
                .select("*");


        if (
            resultado.error
        ) {

            console.warn(
                "Energia:",
                resultado.error.message
            );

            return;

        }


        const dados =
            resultado.data || [];


        let total =
            0;


        dados.forEach(
            function (item) {

                const valor =
                    Number(
                        item.energy_kwh ??
                        item.energia_kwh ??
                        item.generation_kwh ??
                        item.geracao_kwh ??
                        item.valor ??
                        0
                    );


                if (
                    Number.isFinite(
                        valor
                    )
                ) {

                    total +=
                        valor;

                }

            }
        );


        atualizarElemento(
            "energyGenerated",
            formatarNumero(total) +
            " kWh"
        );


    } catch (erro) {

        console.warn(
            "Erro energia:",
            erro
        );

    }

}


/* ============================================================
   V2G
   ============================================================ */

async function carregarV2G() {

    try {

        const resultado =
            await supabaseClient
                .from(
                    "v2g"
                )
                .select("*");


        if (
            resultado.error
        ) {

            console.warn(
                "V2G:",
                resultado.error.message
            );

            return;

        }


        console.log(
            "V2G registros:",
            resultado.data?.length || 0
        );


    } catch (erro) {

        console.warn(
            "Erro V2G:",
            erro
        );

    }

}


/* ============================================================
   ESG
   ============================================================ */

async function carregarESG() {

    try {

        const resultado =
            await supabaseClient
                .from(
                    "indicadores_esg"
                )
                .select("*");


        if (
            resultado.error
        ) {

            console.warn(
                "ESG:",
                resultado.error.message
            );

            return;

        }


        const dados =
            resultado.data || [];


        let co2 =
            0;


        dados.forEach(
            function (item) {

                const valor =
                    Number(
                        item.co2_avoided ??
                        item.co2_evitado ??
                        item.co2_avoidado ??
                        item.valor_co2 ??
                        0
                    );


                if (
                    Number.isFinite(
                        valor
                    )
                ) {

                    co2 +=
                        valor;

                }

            }
        );


        atualizarElemento(
            "co2Avoided",
            formatarNumero(co2) +
            " kg"
        );


    } catch (erro) {

        console.warn(
            "Erro ESG:",
            erro
        );

    }

}


/* ============================================================
   ATUALIZAR ELEMENTO
   ============================================================ */

function atualizarElemento(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            valor;

    }

}


/* ============================================================
   FORMATAÇÃO
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
   ATUALIZAÇÃO AUTOMÁTICA
   ============================================================ */

setInterval(
    function () {

        if (
            supabaseClient
        ) {

            carregarDados();

        }

    },
    60000
);


/* ============================================================
   API GLOBAL
   ============================================================ */

window.GRIDX = {

    abrirSecao:
        abrirSecao,

    carregarDados:
        carregarDados

};


/* ============================================================
   FIM DO APP.JS
   ============================================================ */
```
