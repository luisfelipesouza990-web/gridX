```javascript
/* ============================================================
   GRID-X CONTROL
   APP.JS
   Plataforma GRID-X
   ============================================================ */


/* ============================================================
   CONFIGURAÇÃO SUPABASE
   ============================================================ */

const SUPABASE_URL =
    "https://fshnewxgiskenkkgfbnv.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_Uy4h5ag9SKPOUwhY4yS6dQ_1EpsrnZ1";


let supabaseClient = null;


/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicacao
);


async function iniciarAplicacao() {

    console.log(
        "GRID-X CONTROL iniciando..."
    );


    inicializarSupabase();

    inicializarMenu();

    inicializarMenuMobile();

    atualizarCabecalho(
        "dashboard"
    );

    await carregarDados();


    console.log(
        "GRID-X CONTROL iniciado com sucesso."
    );

}


/* ============================================================
   CONEXÃO SUPABASE
   ============================================================ */

function inicializarSupabase() {

    try {

        if (
            typeof window.supabase ===
            "undefined"
        ) {

            console.error(
                "Biblioteca Supabase não encontrada."
            );

            atualizarStatusSupabase(
                false
            );

            return;

        }


        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );


        atualizarStatusSupabase(
            true
        );


        console.log(
            "Supabase conectado."
        );


    } catch (erro) {

        console.error(
            "Erro ao conectar ao Supabase:",
            erro
        );

        atualizarStatusSupabase(
            false
        );

    }

}


/* ============================================================
   MENU
   ============================================================ */

function inicializarMenu() {

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    console.log(
        "Menus encontrados:",
        menuItems.length
    );


    menuItems.forEach(
        item => {

            item.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();

                    const secao =
                        this.dataset.section;


                    if (!secao) {

                        console.warn(
                            "Menu sem data-section."
                        );

                        return;

                    }


                    abrirSecao(
                        secao
                    );

                }
            );

        }
    );


    abrirSecao(
        "dashboard"
    );

}


/* ============================================================
   ABRIR SEÇÃO
   ============================================================ */

function abrirSecao(
    nomeSecao
) {

    console.log(
        "Abrindo:",
        nomeSecao
    );


    /*
       Esconde todas as seções
    */

    const sections =
        document.querySelectorAll(
            ".page-section"
        );


    sections.forEach(
        section => {

            section.classList.remove(
                "active-section"
            );

            section.style.display =
                "none";

        }
    );


    /*
       Remove o ativo dos menus
    */

    const menus =
        document.querySelectorAll(
            ".menu-item"
        );


    menus.forEach(
        menu => {

            menu.classList.remove(
                "active"
            );

        }
    );


    /*
       Localiza a seção escolhida
    */

    const secao =
        document.getElementById(
            nomeSecao + "Section"
        );


    if (!secao) {

        console.error(
            "Seção não encontrada:",
            nomeSecao + "Section"
        );

        return;

    }


    /*
       Mostra a seção
    */

    secao.style.display =
        "block";

    secao.classList.add(
        "active-section"
    );


    /*
       Ativa o botão
    */

    const menuAtivo =
        document.querySelector(
            `.menu-item[data-section="${nomeSecao}"]`
        );


    if (menuAtivo) {

        menuAtivo.classList.add(
            "active"
        );

    }


    /*
       Atualiza título
    */

    atualizarCabecalho(
        nomeSecao
    );


    /*
       Fecha menu mobile
    */

    fecharMenuMobile();


    /*
       Volta ao topo
    */

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


/* ============================================================
   TÍTULOS
   ============================================================ */

const paginas = {

    dashboard: {

        titulo:
            "Dashboard",

        subtitulo:
            "Visão geral do ecossistema GRID-X"

    },


    ai: {

        titulo:
            "GRID-X AI",

        subtitulo:
            "Inteligência artificial e análise energética"

    },


    energia: {

        titulo:
            "Energia",

        subtitulo:
            "Monitoramento da geração, consumo e eficiência"

    },


    ativos: {

        titulo:
            "Ativos Energéticos",

        subtitulo:
            "Gestão dos ativos do ecossistema GRID-X"

    },


    mercado: {

        titulo:
            "Mercado de Energia",

        subtitulo:
            "Gestão do mercado digital de energia"

    },


    v2g: {

        titulo:
            "V2G",

        subtitulo:
            "Integração entre veículos elétricos e rede"

    },


    sustentabilidade: {

        titulo:
            "Sustentabilidade",

        subtitulo:
            "Indicadores ambientais, sociais e de governança"

    },


    projetos: {

        titulo:
            "Projetos & Inovação",

        subtitulo:
            "Pesquisa, desenvolvimento e novas tecnologias"

    },


    relatorios: {

        titulo:
            "Relatórios",

        subtitulo:
            "Indicadores e informações estratégicas"

    },


    usuarios: {

        titulo:
            "Usuários",

        subtitulo:
            "Gerenciamento dos usuários da plataforma"

    },


    perfil: {

        titulo:
            "Meu Perfil",

        subtitulo:
            "Informações do acesso à plataforma"

    }

};


/* ============================================================
   ATUALIZAR CABEÇALHO
   ============================================================ */

function atualizarCabecalho(
    nomeSecao
) {

    const pagina =
        paginas[nomeSecao];


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
            pagina.titulo;

    }


    if (subtitulo) {

        subtitulo.textContent =
            pagina.subtitulo;

    }

}


/* ============================================================
   MENU MOBILE
   ============================================================ */

function inicializarMenuMobile() {

    const botao =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!botao || !sidebar) {

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

    const elemento =
        document.getElementById(
            "supabaseStatus"
        );


    if (!elemento) {

        return;

    }


    if (conectado) {

        elemento.textContent =
            "Conectado";

        elemento.classList.remove(
            "status-error"
        );

        elemento.classList.add(
            "status-ok"
        );

    } else {

        elemento.textContent =
            "Erro de conexão";

        elemento.classList.remove(
            "status-ok"
        );

        elemento.classList.add(
            "status-error"
        );

    }

}


/* ============================================================
   CARREGAR DADOS
   ============================================================ */

async function carregarDados() {

    if (!supabaseClient) {

        return;

    }


    await carregarAtivos();

    await carregarAI();

    await carregarEnergia();

    await carregarV2G();

    await carregarESG();

}


/* ============================================================
   ATIVOS ENERGÉTICOS
   ============================================================ */

async function carregarAtivos() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "ativos_energeticos"
                )
                .select("*");


        if (error) {

            console.warn(
                "Ativos:",
                error.message
            );

            return;

        }


        console.log(
            "Ativos carregados:",
            data?.length || 0
        );


    } catch (erro) {

        console.error(
            "Erro nos ativos:",
            erro
        );

    }

}


/* ============================================================
   GRID-X AI
   ============================================================ */

async function carregarAI() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "ai_predictions"
                )
                .select("*");


        if (error) {

            console.warn(
                "GRID-X AI:",
                error.message
            );

            return;

        }


        const registros =
            data || [];


        atualizarElemento(
            "predictionCount",
            registros.length
        );


        const anomalias =
            registros.filter(
                item => {

                    const tipo =
                        String(
                            item.type ||
                            item.prediction_type ||
                            item.tipo ||
                            ""
                        ).toLowerCase();


                    return (
                        tipo.includes(
                            "anomaly"
                        ) ||
                        tipo.includes(
                            "anomalia"
                        )
                    );

                }
            ).length;


        atualizarElemento(
            "anomalyCount",
            anomalias
        );


        console.log(
            "Previsões IA:",
            registros.length
        );


    } catch (erro) {

        console.error(
            "Erro GRID-X AI:",
            erro
        );

    }

}


/* ============================================================
   ENERGIA
   ============================================================ */

async function carregarEnergia() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "geracao_energia"
                )
                .select("*");


        if (error) {

            console.warn(
                "Geração de energia:",
                error.message
            );

            return;

        }


        const registros =
            data || [];


        let total =
            0;


        registros.forEach(
            item => {

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


        console.log(
            "Energia gerada:",
            total
        );


    } catch (erro) {

        console.error(
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

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "v2g"
                )
                .select("*");


        if (error) {

            console.warn(
                "V2G:",
                error.message
            );

            return;

        }


        console.log(
            "Registros V2G:",
            data?.length || 0
        );


    } catch (erro) {

        console.error(
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

        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "indicadores_esg"
                )
                .select("*");


        if (error) {

            console.warn(
                "ESG:",
                error.message
            );

            return;

        }


        const registros =
            data || [];


        let co2 =
            0;


        registros.forEach(
            item => {

                const valor =
                    Number(
                        item.co2_avoided ??
                        item.co2_evitado ??
                        item.co2_avoitado ??
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


        console.log(
            "CO2 evitado:",
            co2
        );


    } catch (erro) {

        console.error(
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


    if (!elemento) {

        return;

    }


    elemento.textContent =
        valor;

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
   ATUALIZAÇÃO DO SISTEMA
   ============================================================ */

function atualizarSistema() {

    const elemento =
        document.getElementById(
            "systemStatus"
        );


    if (elemento) {

        elemento.textContent =
            "Operacional";

    }

}


/* ============================================================
   ATUALIZAÇÃO AUTOMÁTICA
   ============================================================ */

setInterval(
    async function () {

        atualizarSistema();


        if (supabaseClient) {

            await carregarDados();

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
        carregarDados,

    carregarAtivos:
        carregarAtivos,

    carregarAI:
        carregarAI,

    carregarEnergia:
        carregarEnergia,

    carregarV2G:
        carregarV2G,

    carregarESG:
        carregarESG

};


/* ============================================================
   FIM
   ============================================================ */
```
