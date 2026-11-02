/* =========================================================================
   1. VARIÁVEIS GLOBAIS E CONTROLO DE TELAS
========================================================================= */
let indiceAtual = 0;
let respostas = new Array(17).fill(null);
let mapa = null;
let marcador = null;
let latitudeSelecionada = null;
let longitudeSelecionada = null;
let planosAtuais = []; 

function mudarTela(idTela) {
    document.querySelectorAll('.tela').forEach(t => {
        t.classList.remove('ativa');
        t.style.display = 'none';
    });
    const telaAlvo = document.getElementById(idTela);
    if(telaAlvo) {
        telaAlvo.classList.add('ativa');
        telaAlvo.style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        console.error("ERRO: A tela '" + idTela + "' não existe no HTML.");
    }
}

/* =========================================================================
   2. DADOS PADRÃO DOS PLANOS DE AULA (COMPLETO: TODOS OS 9 PLANOS)
========================================================================= */
const planosDeAulaPadrao = [
    { 
        disciplina: "Ciências", 
        descricao: "Investigação da qualidade da água, ecossistemas ribeirinhos e impactos da poluição.",
        titulo: "O QUE O PAR REVELA SOBRE UM RIO?",
        ano: "7º ou 8º ano",
        tema: "Água, ambiente e impactos socioambientais",
        bncc: "<ul><li><strong>EF05CI04:</strong> Articulação de conhecimentos prévios sobre múltiplos usos da água.</li><li><strong>EF07CI07:</strong> Analisar características dos ecossistemas locais.</li><li><strong>EF07CI08:</strong> Avaliar alterações ambientais provocadas por ações humanas.</li></ul>",
        objetivo: "Compreender que a observação de um rio permite levantar evidências e formular perguntas.",
        objetos: "Usos da água; recursos hídricos; impactos.",
        duracao: "2 aulas de 50 min.",
        recursos: "Aplicativo PAR; imagens/vídeos; fichas.",
        desenvolvimento: ["Apresentar imagens de um trecho do Rio Jaguaribe e perguntar o que pode ser identificado.", "Apresentar o PAR e explicar sua função pedagógica de observação.", "Em grupos, identificar evidências relacionadas aos parâmetros do protocolo.", "Aplicar o PAR com imagens/vídeos ou em campo, quando possível.", "Comparar registros e formular duas perguntas investigáveis e uma ação educativa."],
        usoPar: "O PAR organiza a observação socioambiental; a pontuação não substitui análise laboratorial.",
        avaliacao: "Ficha de observação, participação e qualidade das perguntas.",
        adaptacoes: "Pode ser realizada com imagens e vídeos quando não houver saída de campo.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Geografia", 
        descricao: "Leitura socioambiental do território, cartografia da bacia hidrográfica e conflitos pelo uso da água.",
        titulo: "RIO JAGUARIBE: TERRITÓRIO, ÁGUA E SOCIEDADE",
        ano: "6º ano",
        tema: "Bacia hidrográfica, ciclo da água, território e sociedade",
        bncc: "<ul><li><strong>EF06GE04:</strong> Descrever o ciclo da água e bacias hidrográficas.</li><li><strong>EF06GE11:</strong> Analisar distintas interações das sociedades com a natureza.</li></ul>",
        objetivo: "Relacionar o Rio Jaguaribe à organização do território e bacia hidrográfica.",
        objetos: "Ciclo da água; bacia; território.",
        duracao: "3 aulas de 50 min.",
        recursos: "Mapa da bacia; imagens; PAR.",
        desenvolvimento: ["Localizar o Rio Jaguaribe e discutir sua relação com o território.", "Explicar bacia hidrográfica e escoamento superficial.", "Observar imagens e aplicar parâmetros do PAR selecionados.", "Relacionar observações à ocupação e cobertura vegetal.", "Produzir mapa/esquema socioambiental do trecho estudado."],
        usoPar: "Selecionar parâmetros pertinentes à leitura geográfica.",
        avaliacao: "Mapa produzido e conceitos geográficos.",
        adaptacoes: "Pode ser realizada com imagens e vídeos.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Língua Portuguesa", 
        descricao: "Produção de relatos de campo, artigos de opinião ambiental e leitura de documentos oficiais.",
        titulo: "VOZES DO RIO",
        ano: "8º ou 9º ano",
        tema: "Leitura, argumentação e produção textual",
        bncc: "<ul><li><strong>EF89LP10:</strong> Planejar artigo de opinião a partir de questão relevante.</li><li><strong>EF08LP03 / EF09LP03:</strong> Produção de artigo de opinião e reportagem.</li></ul>",
        objetivo: "Utilizar registros do PAR e informações do território como base para textos.",
        objetos: "Artigo de opinião; reportagem; argumento.",
        duracao: "3 aulas de 50 min.",
        recursos: "Registros do PAR; fotos; textos.",
        desenvolvimento: ["Selecionar uma questão socioambiental observada.", "Separar observações/evidências de opiniões pessoais.", "Planejar artigo de opinião ou reportagem.", "Produzir texto usando os registros como evidências.", "Revisar, editar e socializar em mural ou blog."],
        usoPar: "Os registros do PAR funcionam como fonte didática e dados argumentativos.",
        avaliacao: "Adequação ao gênero, uso de evidências e argumentação.",
        adaptacoes: "Pode ser adaptado para gravação de podcast.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Matemática", 
        descricao: "Análise de dados estatísticos do PAR, gráficos de poluição e cálculo de volume hídrico.",
        titulo: "OS DADOS DO RIO",
        ano: "7º ou 8º ano",
        tema: "Organização, representação e interpretação de dados",
        bncc: "<ul><li><strong>EF07MA36 / EF08MA27:</strong> Pesquisa, tabelas e gráficos estatísticos.</li></ul>",
        objetivo: "Organizar registros do PAR em tabelas e gráficos, desenvolvendo leitura crítica.",
        objetos: "Tabelas; gráficos; frequência; porcentagens.",
        duracao: "3 aulas de 50 min.",
        recursos: "Registros; planilha ou papel quadriculado.",
        desenvolvimento: ["Transformar registros dos grupos em tabela comum.", "Classificar ocorrências dos parâmetros observados.", "Construir gráficos adequados.", "Calcular frequências e porcentagens.", "Interpretar o que os dados mostram e seus limites."],
        usoPar: "O PAR fornece registros para fins didáticos e estatísticos.",
        avaliacao: "Tabelas, gráficos e interpretação dos dados.",
        adaptacoes: "Trabalho manual ou digital em planilha.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "História", 
        descricao: "A evolução histórica da ocupação das margens do Rio Jaguaribe e sua importância para o semiárido.",
        titulo: "O RIO E A HISTÓRIA DO TERRITÓRIO",
        ano: "8º ou 9º ano",
        tema: "Memória, fontes e transformações do território",
        bncc: "<ul><li><strong>EF09HI08 / EF08HI22:</strong> Transformações ambientais e memória local.</li></ul>",
        objetivo: "Investigar mudanças na relação entre comunidade e Rio usando fontes.",
        objetos: "Fontes históricas; memória; território.",
        duracao: "3 aulas de 50 min.",
        recursos: "Fotos antigas/atuais; relatos; mapas.",
        desenvolvimento: ["Comparar fotografias antigas e atuais e levantar hipóteses.", "Organizar perguntas para pesquisa de memória local.", "Comparar relatos e observações atuais do PAR.", "Construir linha do tempo ou painel histórico.", "Produzir narrativa histórica destacando fontes."],
        usoPar: "O PAR representa a observação atual em contraste com a história.",
        avaliacao: "Uso das fontes e organização temporal.",
        adaptacoes: "Entrevistas com moradores gravadas em vídeo.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Arte", 
        descricao: "Fotografia ambiental, intervenções artísticas com materiais recicláveis e paisagismo.",
        titulo: "REPRESENTANDO O RIO",
        ano: "6º ao 9º ano",
        tema: "Percepção ambiental e representação artística",
        bncc: "<ul><li><strong>EF69AR05 / EF69AR06:</strong> Experimentação e criação em artes visuais.</li></ul>",
        objetivo: "Transformar percepções em produções artísticas comunicativas.",
        objetos: "Artes visuais; fotografia; colagem; intervenção.",
        duracao: "2 ou 3 aulas de 50 min.",
        recursos: "Fotos; registros do PAR; materiais de desenho.",
        desenvolvimento: ["Analisar imagens e discutir formas de representar o ambiente.", "Escolher um aspecto observado para comunicar artisticamente.", "Criar desenho, colagem ou painel expositivo.", "Realizar exposição com legenda explicativa.", "Promover apreciação coletiva das mensagens."],
        usoPar: "Os registros do PAR servem de referência temática e documental.",
        avaliacao: "Processo criativo e comunicação visual.",
        adaptacoes: "Uso exclusivo de fotografia com telemóvel.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Educação Física", 
        descricao: "Atividades de campo ecológico, caminhada estruturada pelas margens e saúde associada à água.",
        titulo: "CORPO, TERRITÓRIO E AMBIENTE",
        ano: "6º ao 9º ano",
        tema: "Práticas corporais, espaços de convivência e condições ambientais",
        bncc: "<ul><li><strong>EF67EF19 / EF89EF21:</strong> Riscos à saúde e adequação de espaços.</li></ul>",
        objetivo: "Refletir sobre espaços de lazer, práticas corporais e segurança ambiental.",
        objetos: "Práticas corporais; lazer; espaço público; segurança.",
        duracao: "2 aulas de 50 min.",
        recursos: "Imagens; PAR; ficha de observação.",
        desenvolvimento: ["Identificar espaços do território usados para lazer.", "Observar condições ambientais do espaço com parâmetros do PAR.", "Relacionar condições ambientais às possibilidades de uso.", "Planejar atividade corporal em espaço seguro.", "Produzir recomendações de cuidado comunitário."],
        usoPar: "Usar parâmetros pertinentes ao espaço físico e de convivência.",
        avaliacao: "Participação e propostas de cuidado.",
        adaptacoes: "Simulação baseada em fotos aéreas.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Língua Inglesa", 
        descricao: "Vocabulário ambiental e elaboração de campanhas globais de conscientização.",
        titulo: "WATER FOR LIFE",
        ano: "6º ao 9º ano",
        tema: "Vocabulário, leitura e comunicação em inglês sobre água",
        bncc: "<ul><li><strong>EF06LI09 / EF08LI11:</strong> Vocabulário e produção de cartazes.</li></ul>",
        objetivo: "Usar a temática da água e o PAR para ampliar vocabulário e produzir mensagens.",
        objetos: "Water, river, pollution, waste, environment.",
        duracao: "2 ou 3 aulas de 50 min.",
        recursos: "Registros do PAR; dicionário; cartolina.",
        desenvolvimento: ["Apresentar vocabulário sobre água e meio ambiente.", "Associar palavras às imagens e aos parâmetros do PAR.", "Criar frases e pequenos textos em inglês.", "Produzir cartazes e fôlderes bilíngues.", "Socializar e revisar coletivamente."],
        usoPar: "O PAR fornece contexto visual e temático real.",
        avaliacao: "Vocabulário, adequação das frases e cartazes.",
        adaptacoes: "Foco em flashcards ecológicos visuais.",
        video: "", imagem: "", linksPesquisa: []
    },
    { 
        disciplina: "Projeto Interdisciplinar", 
        descricao: "Meu Rio, Minha Responsabilidade: Investigação integrada sobre o Rio Jaguaribe utilizando o PAR.",
        titulo: "MEU RIO, MINHA RESPONSABILIDADE",
        ano: "6º ao 9º ano",
        tema: "Educação Ambiental e Hídrica por meio da leitura integrada do território",
        bncc: "<ul><li>Integra Geografia (EF06GE04), Ciências (EF07CI07), Matemática (EF07MA36) e Língua Portuguesa (EF89LP10).</li></ul>",
        objetivo: "Desenvolver investigação interdisciplinar utilizando o PAR como recurso comum.",
        objetos: "Educação ambiental; território; PAR; dados; argumentação.",
        duracao: "6 a 8 aulas.",
        recursos: "PAR Educacional; campo ou imagens; mapas; planilhas.",
        desenvolvimento: ["Problematizar uma questão sobre a relação comunidade-rio.", "Observar imagens ou realizar observação em trecho definido.", "Aplicar o PAR e registrar evidências coletivamente.", "Interpretar observações, causas possíveis e consequências.", "Organizar registros em tabelas e gráficos estatísticos.", "Relacionar território, usos, ocupação e memória local.", "Produzir reportagem, artigo, podcast ou campanha.", "Criar exposição e propor ação educativa de cuidado."],
        usoPar: "O PAR funciona como eixo integrador entre componentes curriculares.",
        avaliacao: "Avaliação processual: participação, registros e produto final.",
        adaptacoes: "Realizado com suporte multimídia se o campo for inviável.",
        video: "", imagem: "", linksPesquisa: []
    }
];

planosAtuais = [...planosDeAulaPadrao]; 

/* =========================================================================
   3. DADOS DA TRILHA DE VÍDEOS
========================================================================= */
const videosFormacao = [
    { titulo: "Vídeo 1 — Educação Ambiental: por que trabalhar de forma transversal?", link: "", descricaoResumida: "Aborda a inserção da Educação Ambiental na escola..." },
    { titulo: "Vídeo 2 — Educação Hídrica: compreender para participar", link: "", descricaoResumida: "Apresenta o conceito de Educação Hídrica..." },
    { titulo: "Vídeo 3 — Água e recursos hídricos: além da ideia de “água potável”", link: "", descricaoResumida: "Discute a amplitude dos recursos hídricos..." },
    { titulo: "Vídeo 4 — O Rio Jaguaribe e o território onde vivemos", link: "", descricaoResumida: "Foca na realidade local do Rio Jaguaribe..." },
    { titulo: "Vídeo 5 — Como fazer uma leitura socioambiental do território?", link: "", descricaoResumida: "Orienta o processo passo a passo: observar, identificar...", reflexao: "💡 <strong>Atividade:</strong> Observar uma imagem de um trecho do Rio Jaguaribe..." },
    { titulo: "Vídeo 6 — Participação social e gestão das águas", link: "", descricaoResumida: "Destaca a importância da participação cidadã..." },
    { titulo: "Vídeo 7 — O que é o PAR?", link: "", descricaoResumida: "Explica a origem e parâmetros do Protocolo de Avaliação Rápida.", reflexao: "💡 <strong>Atividade:</strong> Refletir sobre aspectos observados no território..." },
    { titulo: "Vídeo 8 — Como utilizar o PAR Educacional?", link: "", descricaoResumida: "Tutorial prático gravado diretamente no aplicativo." },
    { titulo: "Vídeo 9 — Do PAR para a sala de aula", link: "", descricaoResumida: "Demonstra como transformar a aplicação em atividade." },
    { titulo: "Vídeo 10 — PAR em diferentes componentes curriculares", link: "", descricaoResumida: "Orienta a aplicação interdisciplinar do PAR." }
];

/* =========================================================================
   4. PARÂMETROS DO APLICATIVO PAR (RESTAURADOS: TEXTOS COMPLETOS PEDAGÓGICOS)
========================================================================= */
const parametros = [
    { 
        id: 1, 
        nomeOriginal: "Tipo principal de ocupação das margens", 
        nomeAcessivel: "Ocupação das Margens", 
        pergunta: "O que existe construído ou plantado ao longo das margens do rio?", 
        oqueObservar: "Observe atentamente a presença de casas, áreas de pastagem, plantações agrícolas, indústrias, estradas ou se há ausência de intervenções humanas diretas no local.", 
        porQueImporta: "A ocupação intensa e inadequada das margens gera despejo de esgoto, impermeabiliza o solo impedindo a absorção da água da chuva e destrói a barreira natural de proteção do rio, aumentando os riscos de poluição.", 
        discussao: "Como o uso desordenado do solo ao redor do rio pode impactar a qualidade da água que consumimos e a segurança das comunidades ribeirinhas durante as cheias?", 
        opcoes: [ 
            { pontos: 5, texto: "Predomínio de cobertura natural, vegetação nativa preservada, sem ocupação humana." }, 
            { pontos: 3, texto: "Uso rural ou agropecuário leve, com baixa interferência direta nas margens." }, 
            { pontos: 2, texto: "Pastagem, criação de animais ou presença humana frequente nas proximidades." }, 
            { pontos: 0, texto: "Uso residencial denso, comercial ou industrial predominante encostado no leito." } 
        ] 
    },
    { 
        id: 2, 
        nomeOriginal: "Erosão e assoreamento", 
        nomeAcessivel: "Erosão e Assoreamento", 
        pergunta: "As margens estão caindo ou há acúmulo excessivo de terra e sedimentos no fundo do rio?", 
        oqueObservar: "Verifique se há barrancos desmoronando, raízes de árvores grandes expostas, fendas profundas no solo da margem ou se o leito do rio está excessivamente raso e lamacento devido ao acúmulo de terra.", 
        porQueImporta: "A erosão desestabiliza as margens, causando desabamentos. A terra que cai vai para o fundo do rio (assoreamento), sufocando a vida aquática, diminuindo a profundidade e reduzindo drasticamente o oxigênio.", 
        discussao: "O que acontece com os peixes, as plantas aquáticas e com o fluxo natural da água se o rio ficar progressivamente mais raso devido ao acúmulo de terra?", 
        opcoes: [ 
            { pontos: 5, texto: "Erosão e assoreamento ausentes ou pouco perceptíveis. Margens e fundo perfeitamente estáveis." }, 
            { pontos: 3, texto: "Sinais leves e pontuais de desmoronamento de terra nas margens." }, 
            { pontos: 2, texto: "Processos moderados de erosão e sedimentação visíveis em boa parte do trecho." }, 
            { pontos: 0, texto: "Erosão e assoreamento acentuados, barrancos caindo e deposição intensa de terra no fundo." } 
        ] 
    },
    { 
        id: 3, 
        nomeOriginal: "Alteração antrópica do entorno", 
        nomeAcessivel: "Modificação Humana no Entorno", 
        pergunta: "O ambiente ao redor do rio foi profundamente modificado pela ação humana?", 
        oqueObservar: "Procure cuidadosamente por pontes, rodovias asfaltadas, tubulações expostas, áreas de desmatamento generalizado ou canalizações artificiais nas imediações do rio.", 
        porQueImporta: "Um entorno fortemente modificado, com asfalto e cimento, perde a capacidade natural de filtrar a água da chuva antes de chegar ao rio, aumentando a velocidade das enxurradas e a poluição urbana.", 
        discussao: "De que maneira é possível desenvolver infraestrutura urbana e rural, como estradas e pontes, sem destruir irremediavelmente o equilíbrio ecológico do rio?", 
        opcoes: [ 
            { pontos: 5, texto: "Alteração ausente ou mínima. Entorno totalmente conservado em estado natural." }, 
            { pontos: 3, texto: "Alteração leve, presença de trilhas de terra ou pequenas intervenções sem forte impacto." }, 
            { pontos: 2, texto: "Alteração moderada, evidências claras de construções e modificação da paisagem." }, 
            { pontos: 0, texto: "Alteração intensa, infraestrutura pesada, estradas de asfalto ou construções invasivas." } 
        ] 
    },
    { 
        id: 4, 
        nomeOriginal: "Presença de vegetação ripária", 
        nomeAcessivel: "Vegetação nas Margens (Mata Ciliar)", 
        pergunta: "Existe vegetação nativa (mata ciliar) protegendo ativamente as margens do rio?", 
        oqueObservar: "Verifique visualmente se existe uma barreira densa de árvores, raízes e arbustos nativos segurando a terra ou se o solo está completamente nu, exposto e desprotegido.", 
        porQueImporta: "A mata ciliar funciona exatamente como os 'cílios' dos nossos olhos ou como um 'rim' para o rio: ela filtra os poluentes antes que cheguem à água e segura firmemente a terra com as raízes para evitar deslizamentos.", 
        discussao: "Se retirarmos todas as árvores e arbustos das margens, o que acontece com a força da água da chuva quando escoa em direção ao leito do rio?", 
        opcoes: [ 
            { pontos: 5, texto: "Vegetação ripária bem conservada, densa e formando uma barreira verde natural completa." }, 
            { pontos: 3, texto: "Vegetação presente ao longo do trecho, mas com falhas evidentes ou sinais de desmatamento parcial." }, 
            { pontos: 2, texto: "Vegetação muito reduzida, restrita a pequenos arbustos isolados e solo predominantemente exposto." }, 
            { pontos: 0, texto: "Vegetação ripária totalmente ausente. Solo completamente nu e desprotegido." } 
        ] 
    },
    { 
        id: 5, 
        nomeOriginal: "Extensão/continuidade da vegetação ripária", 
        nomeAcessivel: "Continuidade da Vegetação (Corredor Verde)", 
        pergunta: "A mata nas margens forma um corredor longo e contínuo ou está fragmentada e cortada?", 
        oqueObservar: "Acompanhe visualmente a margem e verifique se a vegetação segue sem interrupções ou se existem grandes clareiras, loteamentos, cercas ou áreas de pasto cortando a floresta ao meio.", 
        porQueImporta: "A continuidade da mata é ecologicamente essencial para formar 'corredores verdes', garantindo o trânsito seguro de animais silvestres, aves e insetos, além de manter a umidade do microclima local.", 
        discussao: "Por que motivo pequenos 'pedaços' de mata, separados uns dos outros, não têm a mesma eficiência ecológica que um corredor verde contínuo e sem quebras?", 
        opcoes: [ 
            { pontos: 5, texto: "Faixa de vegetação ampla e perfeitamente contínua em toda a extensão do trecho avaliado." }, 
            { pontos: 3, texto: "Vegetação parcialmente contínua, apresentando algumas pequenas quebras ou interrupções pontuais." }, 
            { pontos: 2, texto: "Vegetação extremamente descontínua, fragmentada e restrita a pequenos trechos isolados." }, 
            { pontos: 0, texto: "Praticamente inexistente em formato de corredor, sem qualquer conexão verde ao longo do trecho." } 
        ] 
    },
    { 
        id: 6, 
        nomeOriginal: "Presença de dejetos humanos e/ou animais", 
        nomeAcessivel: "Dejetos e Esgoto Visível", 
        pergunta: "Existem fezes, urina concentrada, restos orgânicos ou lodo de esgoto visíveis nas margens ou flutuando na água?", 
        oqueObservar: "Preste atenção à presença de acúmulos de dejetos provenientes de áreas de criação de animais ou sinais evidentes de lançamento direto de esgoto sanitário bruto na encosta.", 
        porQueImporta: "Estes dejetos não tratados carregam altas cargas de coliformes fecais, bactérias, vírus e parasitas graves que contaminam instantaneamente a água, colocando a saúde pública em risco severo.", 
        discussao: "Quais são os impactos na saúde humana e as principais doenças veiculadas pelo consumo ou contato com água contaminada por esgoto e dejetos não tratados?", 
        opcoes: [ 
            { pontos: 5, texto: "Nenhum dejeto humano ou animal, nem sinais de esgoto observados no trecho." }, 
            { pontos: 3, texto: "Presença muito leve e restrita a pontos localizados de dejetos nas imediações." }, 
            { pontos: 2, texto: "Presença moderada de dejetos e sujeira, fácil de notar visualmente na margem ou na lama." }, 
            { pontos: 0, texto: "Presença acentuada, acúmulo evidente de lodo orgânico fétido, lixo de banheiro e fezes." } 
        ] 
    },
    { 
        id: 7, 
        nomeOriginal: "Presença de animais domésticos", 
        nomeAcessivel: "Acesso de Animais de Criação", 
        pergunta: "Animais de grande porte (como gado bovino, cavalos ou criação de porcos) têm acesso livre à água do rio?", 
        oqueObservar: "Observe se existem animais pastando e caminhando diretamente na margem, ou procure por marcas fundas de cascos, pisoteio intenso e lama remexida nas bordas do leito.", 
        porQueImporta: "O peso concentrado dos animais de grande porte destrói rapidamente a estrutura frágil das margens provocando erosão, e a libertação de urina e fezes na água contamina-a com excesso de nitrogênio e parasitas.", 
        discussao: "Quais são as alternativas viáveis para que os produtores rurais consigam fornecer água de qualidade para os seus rebanhos sem permitir que os animais destruam e poluam o leito do rio?", 
        opcoes: [ 
            { pontos: 5, texto: "Animais totalmente ausentes. Sem nenhum sinal de acesso direto à água ou danos às margens." }, 
            { pontos: 3, texto: "Presença ocasional de animais, com acesso controlado e sem gerar pisoteio destrutivo." }, 
            { pontos: 2, texto: "Presença frequente de animais de criação, com trilhas marcadas e acesso regular às margens." }, 
            { pontos: 0, texto: "Presença intensa de rebanhos, margens destruídas por forte pisoteio e animais circulando dentro da água." } 
        ] 
    },
    { 
        id: 8, 
        nomeOriginal: "Alterações físicas nas margens", 
        nomeAcessivel: "Modificações Físicas nas Margens", 
        pergunta: "As margens foram artificializadas com revestimento de cimento, muros de pedra, escavações ou dragagens mecânicas?", 
        oqueObservar: "Verifique atentamente a presença de paredes retas de concreto, contenções artificiais usando pedras e telas (gabiões), cercas rígidas entrando na água ou canalização feita por máquinas escavadoras.", 
        porQueImporta: "Cimentar, canalizar ou alterar rigidamente o formato das margens retira a capacidade do rio de absorver a água das cheias. Isso acelera a velocidade da correnteza e transfere o problema das enchentes com muito mais violência para as áreas mais abaixo.", 
        discussao: "Por que motivo o hábito comum de revestir as margens de um rio inteiro com cimento para tentar 'evitar enchentes' costuma gerar problemas ambientais e sociais ainda mais graves a longo prazo?", 
        opcoes: [ 
            { pontos: 5, texto: "Margens inteiramente naturais, sem nenhuma alteração física, cimento ou estrutura de contenção." }, 
            { pontos: 3, texto: "Pequenas estruturas pontuais (ex: pequenas estacas de madeira), sem grande impacto na dinâmica natural do rio." }, 
            { pontos: 2, texto: "Modificação física significativa, presença de cortes drásticos no barranco ou muros parciais de alvenaria." }, 
            { pontos: 0, texto: "Margens fortemente artificializadas, totalmente concretadas, emparedadas, retificadas ou profundamente dragadas." } 
        ] 
    },
    { 
        id: 9, 
        nomeOriginal: "Cobertura de plantas aquáticas/macrófitas", 
        nomeAcessivel: "Plantas Aquáticas (Macrófitas)", 
        pergunta: "Há um crescimento excessivo e descontrolado de plantas aquáticas flutuantes (como aguapés) cobrindo a superfície da água?", 
        oqueObservar: "Verifique se a lâmina d'água está limpa e livre ou se formou um tapete denso, espesso e contínuo de vegetação verde boiando sobre toda a superfície do rio.", 
        porQueImporta: "Em rios, o crescimento explosivo de macrófitas não é um sinal de natureza saudável. Pelo contrário: indica eutrofização, que é o excesso de nutrientes poluentes (como esgoto bruto e adubos químicos) dissolvidos na água.", 
        discussao: "O que acontece com a entrada de luz solar, com as algas microscópicas e com a quantidade de oxigênio no fundo do rio quando a superfície fica inteiramente tapada por aguapés?", 
        opcoes: [ 
            { pontos: 5, texto: "Plantas aquáticas ausentes ou presentes em quantidade equilibrada e natural. Superfície livre para a luz." }, 
            { pontos: 3, texto: "Cobertura moderada de plantas pelas bordas, mas sem dominar ou sufocar o corpo d'água principal." }, 
            { pontos: 2, texto: "Cobertura elevada de plantas aquáticas, formando manchas grandes e cobrindo áreas significativas do trecho." }, 
            { pontos: 0, texto: "Cobertura extrema e totalmente dominante. A superfície da água parece um verdadeiro 'tapete verde', escondendo o rio." } 
        ] 
    },
    { 
        id: 10, 
        nomeOriginal: "Evidências de lançamento de águas residuárias", 
        nomeAcessivel: "Lançamento de Esgoto e Efluentes", 
        pergunta: "Existem canos, tubos de PVC, valas de concreto ou esgotos a céu aberto despejando água suja diretamente no rio?", 
        oqueObservar: "Faça uma varredura visual nas margens e nos barrancos procurando por tubos cortados, córregos artificiais escuros, galerias pluviais com mau cheiro ou pontos de despejo de efluentes industriais e domésticos.", 
        porQueImporta: "O despejo de esgoto não tratado (águas residuárias) é a principal e mais letal causa direta de degradação da qualidade da água, provocando a perda drástica de oxigênio e a morte de peixes e microorganismos benéficos.", 
        discussao: "De quem é a responsabilidade legal, ambiental e social de garantir a construção de sistemas de tratamento adequado de esgoto nas cidades para evitar que este chegue cru ao rio?", 
        opcoes: [ 
            { pontos: 5, texto: "Nenhuma evidência visual de lançamento de esgoto, inexistência de canos clandestinos ou valas poluentes." }, 
            { pontos: 3, texto: "Evidências indiretas leves, como pequenas valas de drenagem pluvial com suspeita de ligações irregulares." }, 
            { pontos: 2, texto: "Lançamento de esgoto claro, direto e localizado através de tubulações visíveis ou pequenas valas abertas." }, 
            { pontos: 0, texto: "Múltiplos pontos evidentes e extensos de despejo contínuo de esgoto bruto, manchando e poluindo ativamente o rio." } 
        ] 
    },
    { 
        id: 11, 
        nomeOriginal: "Odor da água", 
        nomeAcessivel: "Cheiro da Água", 
        pergunta: "A água apresenta algum odor forte, químico, fétido ou marcadamente desagradável?", 
        oqueObservar: "Aproxime-se com segurança e sinta o cheiro do ambiente próximo à água: é o odor característico e natural de terra úmida/água limpa ou exala um cheiro forte a esgoto, lixo apodrecido ou gás (ovo podre)?", 
        porQueImporta: "Odores anormais ou repulsivos indicam uma degradação severa. Cheiro a 'ovo podre' (gás sulfídrico), por exemplo, prova a ausência completa de oxigênio dissolvido e a intensa decomposição de matéria orgânica poluente no fundo.", 
        discussao: "Uma água que apresenta coloração escura e exala forte odor fétido pode ser utilizada de forma segura pela comunidade para atividades de irrigação agrícola ou consumo de animais de criação?", 
        opcoes: [ 
            { pontos: 5, texto: "Odor perfeitamente natural de rio saudável e terra úmida, sem nenhum cheiro químico ou anormal." }, 
            { pontos: 3, texto: "Leve alteração no cheiro ambiente, sendo perceptível apenas ao aproximar-se excessivamente da margem." }, 
            { pontos: 2, texto: "Odor claro, invasivo e perceptível, associado a lodo orgânico, lixo em decomposição ou poluição moderada." }, 
            { pontos: 0, texto: "Forte odor fétido e insuportável de esgoto cru, gás sulfídrico (ovo podre) ou solventes químicos industriais." } 
        ] 
    },
    { 
        id: 12, 
        nomeOriginal: "Cor/aspecto da água", 
        nomeAcessivel: "Cor e Aparência da Água", 
        pergunta: "A coloração natural e a transparência da água apresentam características anormais, industriais ou excessivamente turvas?", 
        oqueObservar: "Verifique detalhadamente se a água perdeu o aspeto límpido ou turvo natural, assumindo uma coloração verde muito escura e espessa, leitosa, escurecida ou apresentando manchas brilhantes de óleo na superfície.", 
        porQueImporta: "Alterações drásticas na cor natural de um corpo d'água funcionam como os indicadores visuais mais rápidos e evidentes da presença de contaminações severas por produtos químicos industriais ou grandes volumes de despejo orgânico.", 
        discussao: "A presença de espessa espuma branca boiando na superfície e formando montanhas é sempre um fenómeno natural ou está geralmente ligada ao uso doméstico e industrial de que tipo de produtos?", 
        opcoes: [ 
            { pontos: 5, texto: "Água com coloração e aspeto estritamente naturais, típicos da geologia da região e compatíveis com o regime de chuvas." }, 
            { pontos: 3, texto: "Pequena alteração na cor natural esperada, estando a água um pouco mais turva que o habitual, sem sinais químicos." }, 
            { pontos: 2, texto: "Alteração visual bastante evidente, com a água a apresentar-se excessivamente escura, barrenta esverdeada ou com turvação marcante." }, 
            { pontos: 0, texto: "Aspeto altamente alterado e artificial: extensas manchas de óleo, coloração química ou forte acúmulo de espuma densa e persistente." } 
        ] 
    },
    { 
        id: 13, 
        nomeOriginal: "Caracterização/heterogeneidade do fundo e habitats", 
        nomeAcessivel: "Diversidade de Habitats", 
        pergunta: "O trecho do rio oferece naturalmente diferentes tipos de abrigos, profundidades, remansos e refúgios para a vida aquática?", 
        oqueObservar: "Procure pela existência de uma variedade de microambientes, como corredeiras rápidas, poços fundos de água calma, grandes troncos submersos, blocos de pedras irregulares e raízes expostas nas margens.", 
        porQueImporta: "Na natureza, a complexidade gera vida. Quanto mais diversificado, irregular e cheio de reentrâncias for o formato do rio e os seus abrigos, maior será a quantidade de diferentes espécies de animais, peixes e plantas que conseguirão sobreviver, caçar e reproduzir-se ali.", 
        discussao: "Na perspetiva ecológica, 'limpar' mecanicamente as margens de um rio, retirando todos os galhos caídos, troncos e pedras naturais, traz benefícios ou, pelo contrário, é prejudicial para o ecossistema local?", 
        opcoes: [ 
            { pontos: 5, texto: "Ambiente extremamente diversificado, rico em remansos, pedras de vários tamanhos, galhadas e alternância de profundidades." }, 
            { pontos: 3, texto: "Diversidade moderada de habitats, apresentando algumas opções interessantes de abrigo natural para a fauna aquática." }, 
            { pontos: 2, texto: "Ambiente muito simplificado e retificado, com pouquíssimos tipos de abrigo e baixa variação física na calha do rio." }, 
            { pontos: 0, texto: "Fundo e margens totalmente homogêneos, achatados, lisos, canalizados a cimento ou sem absolutamente nenhum refúgio natural." } 
        ] 
    },
    { 
        id: 14, 
        nomeOriginal: "Tipo de substrato dominante", 
        nomeAcessivel: "Material no Fundo do Rio (Substrato)", 
        pergunta: "De que tipo de material geológico ou sedimentar é composto majoritariamente o fundo do rio neste trecho de observação?", 
        oqueObservar: "Tente verificar, através da transparência da água ou usando um bastão longo, se o fundo é sólido e formado por rochas firmes, cascalho grosso e areia limpa, ou se há um acúmulo profundo e macio de lodo escuro, argila fina e material pastoso.", 
        porQueImporta: "O lodo excessivamente escuro, pastoso e anóxico asfixia fisicamente os organismos bentônicos (insetos e crustáceos minúsculos que vivem e alimentam-se no fundo) e inviabiliza completamente a desova segura de várias espécies nativas de peixes.", 
        discussao: "Qual é a relação direta entre o desmatamento indiscriminado das matas ciliares nas partes mais altas da bacia e o soterramento por lama fina (assoreamento) que destrói as pedras do fundo do rio nas partes mais baixas?", 
        opcoes: [ 
            { pontos: 5, texto: "Substrato diversificado e de aspeto natural saudável, composto predominantemente por pedras firmes, cascalhos soltos e areia limpa." }, 
            { pontos: 3, texto: "Predomínio de areia simples e sedimentos, com uma estrutura natural um pouco mais simplificada, mas sem lama excessiva." }, 
            { pontos: 2, texto: "Predomínio marcante de lama fina e poeira sedimentar assentada e acumulada numa camada espessa no fundo do leito." }, 
            { pontos: 0, texto: "Fundo totalmente tomado por resíduos urbanos pesados, pneus, entulhos afundados ou lodo escuro, pastoso e em visível apodrecimento." } 
        ] 
    },
    { 
        id: 15, 
        nomeOriginal: "Resíduos sólidos nas margens e no entorno imediato", 
        nomeAcessivel: "Lixo nas Margens (Resíduos Sólidos)", 
        pergunta: "Há indícios visíveis de lixo urbano, entulhos e embalagens descartadas acumulados nas margens de terra, barrancos e áreas secas próximas ao rio?", 
        oqueObservar: "Caminhe visualmente pelas margens secas e identifique ativamente a presença de garrafas plásticas (PET), sacolas plásticas amarradas, embalagens metalizadas de alimentos, fraldas, móveis velhos abandonados, pneus usados ou montes de restos de construção civil (entulho).", 
        porQueImporta: "O lixo sólido acumulado nas margens causa grave degradação visual, atrai roedores e insetos vetores de doenças humanas graves, altera a composição química do solo e, inexoravelmente, acabará por ser arrastado pelas próximas enxurradas fortes de chuva diretamente para dentro da correnteza do rio.", 
        discussao: "Na sua observação de campo, o lixo encontrado predominantemente espalhado nas margens dá a impressão de ter sido descartado ali diretamente por moradores do local, ou possui sinais de ter vindo de longe e sido trazido e depositado no local pela força da correnteza da última grande cheia?", 
        opcoes: [ 
            { pontos: 5, texto: "Ausência total e exemplar de resíduos sólidos, lixo urbano ou entulhos de qualquer natureza nas margens secas e em todo o entorno imediato." }, 
            { pontos: 3, texto: "Presença de pequeníssima quantidade de plásticos isolados e pequenos lixos residenciais descartados pontualmente por descuido." }, 
            { pontos: 2, texto: "Quantidade significativa e moderada de lixo espalhado, evidenciando pontos específicos e crónicos de acúmulo nas barrancas." }, 
            { pontos: 0, texto: "Grande quantidade descontrolada de lixo pesado, plásticos domésticos, entulhos de obras e materiais inservíveis espalhado em formato de lixeira a céu aberto." } 
        ] 
    },
    { 
        id: 16, 
        nomeOriginal: "Resíduos/dejetos no corpo d'água", 
        nomeAcessivel: "Lixo Flutuando na Água", 
        pergunta: "É possível observar garrafas, tampinhas, sacolas plásticas esfarrapadas ou outros detritos não naturais boiando livremente na correnteza ou firmemente enroscados dentro da lâmina d'água?", 
        oqueObservar: "Observe minuciosamente a superfície livre da água no meio da correnteza e também os galhos de plantas ribeirinhas nas margens rasas para verificar se existem lixos sólidos leves retidos e enroscados permanentemente pelo fluxo da água.", 
        porQueImporta: "Quando os plásticos (mesmo os aparentemente inofensivos) permanecem dentro da água expostos ao sol e ao movimento, eles fragmentam-se mecanicamente e quimicamente, transformando-se nos perigosíssimos microplásticos. Além disso, sacolas inteiras sufocam fatalmente pequenos e médios animais aquáticos e aves por ingestão acidental, degradando o ecossistema e a cadeia alimentar.", 
        discussao: "Pensando na linha do tempo ambiental, quantos séculos aproximadamente uma garrafa plástica tipo PET ou uma simples sacola de supermercado, descartada incorretamente pela janela de um carro, demora para se desfazer e decompor completamente se for parar dentro do leito de um rio?", 
        opcoes: [ 
            { pontos: 5, texto: "Ausência absolutamente completa de qualquer tipo de resíduo artificial, plástico, embalagem ou lixo leve flutuando dentro do corpo d'água." }, 
            { pontos: 3, texto: "Presença de pouquíssimos resíduos isolados (por exemplo, apenas uma ou duas embalagens pequenas visíveis flutuando ao longe)." }, 
            { pontos: 2, texto: "Presença recorrente e moderada de vários lixos plásticos flutuando ou emaranhados cronicamente nas raízes e plantas aquáticas ao longo da margem." }, 
            { pontos: 0, texto: "Abundância alarmante de lixo flutuante variado cobrindo partes extensas da superfície, bloqueando a luz solar, retendo espuma suja e poluindo gravemente o leito." } 
        ] 
    },
    { 
        id: 17, 
        nomeOriginal: "Características do fluxo da água", 
        nomeAcessivel: "Movimento da Água (Fluxo)", 
        pergunta: "A dinâmica atual da água neste trecho apresenta uma correnteza natural correndo de forma livre e fluida ao longo da calha do rio, ou a água encontra-se totalmente bloqueada, parada e empoçada num sistema estagnado?", 
        oqueObservar: "Foque a sua atenção diretamente na velocidade de deslocamento da água pelo canal principal. Verifique se existe um fluxo hídrico contínuo e rítmico arrastando folhagens flutuantes, ou se o rio foi cortado e transformou-se em 'poças e lagoas' estáticas sem comunicação entre si, cheias de água velha presa.", 
        porQueImporta: "A manutenção do fluxo de água, seja ele rápido ou moderado, é fundamental para o constante turbilhonamento que insere o oxigênio atmosférico na água (reaneração). A estagnação contínua e artificial da água aquece demasiadamente a camada superior, elimina a oxigenação, propicia as condições ideais para epidemias de reprodução de mosquitos transmissores de doenças e acelera drasticamente a eutrofização e a morte de cardumes inteiros.", 
        discussao: "Avaliando holisticamente a nossa relação com o território: por que é que a intervenção humana frequente que joga lixo, terra e detritos pesados nas margens — que acabam desmoronando, assoreando o fundo e criando ilhas artificiais que 'freiam' permanentemente a água do rio — é um processo tão negativo, cumulativo e destrutivo a longo prazo para o frágil equilíbrio hídrico do bioma semiárido?", 
        opcoes: [ 
            { pontos: 5, texto: "Fluxo aquático inteiramente contínuo, natural e plenamente livre de barreiras artificiais. Correnteza saudável e rítmica facilmente perceptível em todo o decorrer do trecho avaliado." }, 
            { pontos: 3, texto: "Fluxo d'água um pouco lento ou parcialmente prejudicado nas bordas, mas sem sofrer interrupções maiores e sem formar bolsões ou poças estagnadas permanentes." }, 
            { pontos: 2, texto: "Fluxo severamente restrito e prejudicado. Apresenta grande quantidade de água retida e acumulada sem força para correr, gerando áreas extensas onde a água repousa com sinais visuais de estagnação e falta de oxigenação superficial." }, 
            { pontos: 0, texto: "Estagnação total, bloqueio crítico e asfixia mecânica do rio. O corpo hídrico encontra-se totalmente fracionado e desconectado em poças isoladas sem vida, geralmente causadas por grandes barreiras de entulho humano ou episódios de forte e severo assoreamento que secaram a correnteza principal." } 
        ] 
    }
];

/* =========================================================================
   5. CONFIGURAÇÕES E PAINEL ADMINISTRATIVO (COMPLETO COM GERADOR AVANÇADO)
========================================================================= */
function obterConfigGeral() {
    let cfg = localStorage.getItem('par_config_geral');
    if (cfg) try { return JSON.parse(cfg); } catch(e){}
    return { videos: videosFormacao.map(() => ""), eventoData: "Jaguaribe - CE", imgCertificadoFrenteBase64: "", imgCertificadoVersoBase64: "" };
}

function togglePainelAdminGeral() {
    const painel = document.getElementById('painel-admin-geral');
    if (painel.classList.contains('escondido')) {
        painel.classList.remove('escondido'); 
        document.getElementById('admin-login-box').classList.remove('escondido'); 
        document.getElementById('admin-conteudo-protegido').classList.add('escondido');
    } else { 
        painel.classList.add('escondido'); 
    }
}

function verificarSenhaAdmin() {
    if (document.getElementById('senha-admin').value === "profagua2026") {
        document.getElementById('admin-login-box').classList.add('escondido'); 
        document.getElementById('admin-conteudo-protegido').classList.remove('escondido');
        
        const container = document.getElementById('inputs-admin-videos');
        container.innerHTML = '<h3 style="color:#0369a1; margin-bottom:10px;">Configurar Vídeos</h3>'; 
        let config = obterConfigGeral();
        videosFormacao.forEach((v, index) => {
            container.innerHTML += `<div style="display:flex; flex-direction:column; gap:3px; margin-bottom:5px;"><label style="font-size:0.85rem; font-weight:600;">Módulo ${index+1}</label><input type="text" id="admin-video-${index}" value="${config.videos[index] || ''}" style="padding:6px; border-radius:4px; border:1px solid #ccc;"></div>`;
        });
        document.getElementById('config-evento-data').value = config.eventoData;

        if (!document.getElementById('painel-planos-admin')) {
            const adminProt = document.getElementById('admin-conteudo-protegido');
            const planDiv = document.createElement('div');
            planDiv.id = 'painel-planos-admin';
            planDiv.innerHTML = `
                <div style="background:#f8fafc; border:2px dashed #94a3b8; border-radius:12px; padding:25px; margin-top:35px; margin-bottom:15px;">
                    <h3 style="color:#0369a1; margin-bottom:10px; font-size:1.3rem;">➕ Adicionar Novo Plano de Aula Completo</h3>
                    <p style="font-size:0.9rem; color:#475569; margin-bottom:20px; line-height:1.5;">Preencha todos os campos do plano metodológico. De seguida clique no botão verde para gerar o ficheiro <b>planos.json</b> e adicione-o ao servidor.</p>
                    
                    <h4 style="color:#334155; margin-bottom:10px; border-bottom:1px solid #cbd5e1; padding-bottom:5px;">1. Informações Básicas</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:10px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Disciplina *</label><input type="text" id="novo-p-disciplina" placeholder="Ex: Biologia" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Título do Plano *</label><input type="text" id="novo-p-titulo" placeholder="Ex: A Vida no Rio" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                    </div>
                    <label style="font-size:0.85rem; font-weight:bold; color:#334155;">Descrição Curta</label>
                    <textarea id="novo-p-descricao" placeholder="Descrição resumida que aparece no card..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:10px; font-family:inherit;"></textarea>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:10px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Ano Escolar</label><input type="text" id="novo-p-ano" placeholder="Ex: 8º e 9º ano" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Duração</label><input type="text" id="novo-p-duracao" placeholder="Ex: 2 aulas de 50 min" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Tema Central</label><input type="text" id="novo-p-tema" placeholder="Ex: Meio Ambiente" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Objetos de Conhecimento</label><input type="text" id="novo-p-objetos" placeholder="Ex: Ciclo da Água, Impactos..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                    </div>

                    <h4 style="color:#334155; margin-bottom:10px; border-bottom:1px solid #cbd5e1; padding-bottom:5px;">2. Estrutura Pedagógica</h4>
                    <label style="font-size:0.85rem; font-weight:bold; color:#334155;">Alinhamento Estratégico à BNCC</label>
                    <textarea id="novo-p-bncc" placeholder="Ex: <ul><li>EF05CI04: Articulação...</li></ul>" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:10px; font-family:inherit;"></textarea>
                    
                    <label style="font-size:0.85rem; font-weight:bold; color:#334155;">Objetivo Geral</label>
                    <textarea id="novo-p-objetivo" placeholder="Ex: Compreender a importância da preservação..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:10px; font-family:inherit;"></textarea>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:10px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Recursos Necessários</label><textarea id="novo-p-recursos" placeholder="Ex: PAR, lápis, mapas..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; font-family:inherit;"></textarea></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Como utilizar o PAR?</label><textarea id="novo-p-usopar" placeholder="Ex: O PAR será usado para classificar margens..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; font-family:inherit;"></textarea></div>
                    </div>

                    <label style="font-size:0.85rem; font-weight:bold; color:#334155;">Fluxograma do Desenvolvimento (escreva um passo por linha)</label>
                    <textarea id="novo-p-desenvolvimento" placeholder="Passo 1: Introdução ao tema...\nPasso 2: Ida ao Rio...\nPasso 3: Aplicação do PAR..." style="width:100%; height:100px; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:20px; font-family:inherit;"></textarea>
                    
                    <h4 style="color:#334155; margin-bottom:10px; border-bottom:1px solid #cbd5e1; padding-bottom:5px;">3. Finalização e Avaliação</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Avaliação</label><textarea id="novo-p-avaliacao" placeholder="Ex: Participação e entrega do relatório." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; font-family:inherit;"></textarea></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Adaptações Inclusivas</label><textarea id="novo-p-adaptacoes" placeholder="Ex: Uso de vídeos e fotos caso não haja saída..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; font-family:inherit;"></textarea></div>
                    </div>

                    <h4 style="color:#334155; margin-bottom:10px; border-bottom:1px solid #cbd5e1; padding-bottom:5px;">4. Multimédia e Links</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:10px;">
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Link para Vídeo (YouTube)</label><input type="text" id="novo-p-video" placeholder="Ex: https://www.youtube.com/watch?v=..." style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                        <div><label style="font-size:0.85rem; font-weight:bold; color:#334155;">Link de Imagem/Foto (URL)</label><input type="text" id="novo-p-imagem" placeholder="Ex: https://site.com/imagem.jpg" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1;"></div>
                    </div>
                    <label style="font-size:0.85rem; font-weight:bold; color:#334155;">Links de Sites para Pesquisa (escreva um link por linha)</label>
                    <textarea id="novo-p-links" placeholder="https://www.ibge.gov.br\nhttps://snis.gov.br" style="width:100%; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:20px; font-family:inherit;"></textarea>
                    
                    <button type="button" onclick="gerarEBaixarPlanos()" style="width:100%; background:#16a34a; color:white; padding:14px; border:none; border-radius:6px; font-size:1.1rem; font-weight:bold; cursor:pointer; box-shadow: 0 4px 6px rgba(22,163,74,0.3);">⬇️ Gerar e Baixar planos.json Completo</button>
                </div>
            `;
            adminProt.appendChild(planDiv);
        }

    } else { 
        alert("Senha incorreta!"); 
    }
}

function salvarConfiguracoesGerais() {
    let config = obterConfigGeral();
    config.videos = videosFormacao.map((_, i) => document.getElementById(`admin-video-${i}`).value);
    config.eventoData = document.getElementById('config-evento-data').value;
    const fileFrente = document.getElementById('config-img-certificado').files[0];
    const fileVerso = document.getElementById('config-img-certificado-verso').files[0];

    if (!fileFrente && !fileVerso) { 
        localStorage.setItem('par_config_geral', JSON.stringify(config)); 
        document.getElementById('painel-admin-geral').classList.add('escondido'); 
        carregarVideos(); 
        alert("Salvo com sucesso!"); 
        return; 
    }
    if (fileFrente) { 
        const r = new FileReader(); 
        r.onload = (e) => { 
            config.imgCertificadoFrenteBase64 = e.target.result; 
            if(!fileVerso) finalizarConfig(config); 
        }; 
        r.readAsDataURL(fileFrente); 
    }
    if (fileVerso) { 
        const r = new FileReader(); 
        r.onload = (e) => { 
            config.imgCertificadoVersoBase64 = e.target.result; 
            finalizarConfig(config); 
        }; 
        r.readAsDataURL(fileVerso); 
    }
}

function finalizarConfig(config) { 
    localStorage.setItem('par_config_geral', JSON.stringify(config)); 
    document.getElementById('painel-admin-geral').classList.add('escondido'); 
    carregarVideos(); 
    alert("Salvo com sucesso!"); 
}

function extrairIdYoutube(url) {
    if (!url) return ""; url = url.trim();
    if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    return (match && match[2].length === 11) ? match[2] : url;
}

function gerarEBaixarPlanos() {
    const d = document.getElementById('novo-p-disciplina').value.trim();
    const t = document.getElementById('novo-p-titulo').value.trim();
    if(!d || !t) { alert("⚠️ Preencha pelo menos a Disciplina e o Título."); return; }

    const desc = document.getElementById('novo-p-descricao').value.trim();
    const a = document.getElementById('novo-p-ano').value.trim();
    const dur = document.getElementById('novo-p-duracao').value.trim();
    const tema = document.getElementById('novo-p-tema').value.trim();
    const objs = document.getElementById('novo-p-objetos').value.trim();
    const bncc = document.getElementById('novo-p-bncc').value.trim();
    const objGeral = document.getElementById('novo-p-objetivo').value.trim();
    const rec = document.getElementById('novo-p-recursos').value.trim();
    const uso = document.getElementById('novo-p-usopar').value.trim();
    const devTexto = document.getElementById('novo-p-desenvolvimento').value.trim();
    const av = document.getElementById('novo-p-avaliacao').value.trim();
    const adap = document.getElementById('novo-p-adaptacoes').value.trim();
    const vid = document.getElementById('novo-p-video').value.trim();
    const img = document.getElementById('novo-p-imagem').value.trim();
    const linksTxt = document.getElementById('novo-p-links').value.trim();

    const devArray = devTexto ? devTexto.split('\n').filter(linha => linha.trim() !== '') : ["Desenvolvimento da aula (não preenchido)."];
    const linksArray = linksTxt ? linksTxt.split('\n').filter(linha => linha.trim() !== '') : [];

    const novoPlano = {
        disciplina: d,
        titulo: t,
        descricao: desc || "Plano de aula gerado metodologicamente.",
        ano: a || "A definir",
        duracao: dur || "A definir",
        tema: tema || "Tema livre",
        objetos: objs || "Objetos não especificados",
        bncc: bncc || "Não especificado",
        objetivo: objGeral || "Objetivo não preenchido",
        recursos: rec || "Recursos básicos",
        usoPar: uso || "Integração a critério do docente",
        desenvolvimento: devArray,
        avaliacao: av || "Avaliação contínua",
        adaptacoes: adap || "Sem adaptações preenchidas",
        video: vid,
        imagem: img,
        linksPesquisa: linksArray
    };

    planosAtuais.push(novoPlano);

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ planos: planosAtuais }, null, 4));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "planos.json");
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    dlAnchorElem.remove();

    alert("✅ Ficheiro 'planos.json' transferido!\nFaça o upload desse ficheiro para o seu servidor para ficar disponível online.");
    
    // Limpar os campos após geração
    document.querySelectorAll('#painel-planos-admin input, #painel-planos-admin textarea').forEach(el => el.value = '');
    carregarPlanosDOM();
}

/* =========================================================================
   6. CARREGAMENTO E RENDERIZAÇÃO DOS PLANOS DE AULA
========================================================================= */
async function carregarPlanos() {
    const container = document.getElementById('grid-planos-container');
    if (!container) return;
    
    try {
        const resposta = await fetch('planos.json?' + new Date().getTime());
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson && dadosJson.planos) {
                planosAtuais = dadosJson.planos;
            }
        }
    } catch (e) {
        // Usa os padrões se não encontrar o JSON online
    }
    carregarPlanosDOM();
}

function carregarPlanosDOM() {
    const container = document.getElementById('grid-planos-container');
    if (!container) return;
    container.innerHTML = '';
    
    planosAtuais.forEach(function(p, index) {
        let corBorda = p.disciplina.includes("Interdisciplinar") ? "#f59e0b" : "#004d80";
        container.innerHTML += `
            <div class='plano-card' style='background: white; border: 1px solid #cbd5e1; border-radius: 12px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 5px solid ${corBorda};'>
                <div>
                    <h4 style='color: #004d80; margin-bottom: 12px; font-size: 1.2rem; font-weight: bold;'>${p.disciplina}</h4>
                    <p style='color: #475569; font-size: 0.95rem; margin-bottom: 25px; line-height: 1.5;'>${p.descricao}</p>
                </div>
                <button onclick='abrirPlano(${index})' class='btn-baixar-plano' style='display: block; width: 100%; padding: 14px; background: #004d80; color: white; border: none; border-radius: 8px; text-align: center; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 6px rgba(0,77,128,0.2);'>
                    Acessar Plano de Aula
                </button>
            </div>
        `;
    });
}

function abrirPlano(index) {
    const plano = planosAtuais[index];
    const container = document.getElementById('conteudo-plano-detalhe');
    if(!container) return;

    let htmlDesenvolvimento = plano.desenvolvimento.map((passo, i) => `
        <div style="display: flex; gap: 15px; margin-bottom: 20px; align-items: flex-start;">
            <div style="background: #004d80; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 1.15rem; box-shadow: 0 3px 6px rgba(0,77,128,0.3);">
                ${i + 1}
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; flex-grow: 1; border-left: 6px solid #004d80; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
                <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: #1e293b;">${passo}</p>
            </div>
        </div>
    `).join('');

    // Prepara Multimédia (Imagem, Vídeo, Links)
    let htmlMultimedia = '';
    if(plano.imagem) {
        htmlMultimedia += `<div style="margin-top:30px; text-align:center;"><img src="${plano.imagem}" alt="Imagem do Plano" style="max-width:100%; max-height:400px; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);"></div>`;
    }
    if(plano.video) {
        let idVid = extrairIdYoutube(plano.video);
        if(idVid) {
           htmlMultimedia += `
           <div style="margin-top:30px;">
               <h4 style="color:#004d80; margin-bottom:15px; font-size:1.3rem;">▶️ Vídeo de Apoio</h4>
               <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden; background: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                   <iframe src="https://www.youtube.com/embed/${idVid}" allowfullscreen style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"></iframe>
               </div>
           </div>`;
        }
    }
    
    let htmlLinks = '';
    if(plano.linksPesquisa && plano.linksPesquisa.length > 0) {
        let lis = plano.linksPesquisa.map(l => `<li style="margin-bottom:8px;"><a href="${l}" target="_blank" style="color:#0369a1; text-decoration:none; font-weight:600; word-break: break-all;">${l}</a></li>`).join('');
        htmlLinks = `
        <div style="margin-top:30px; background:#f0fdf4; border-left:6px solid #16a34a; padding:20px; border-radius:10px;">
            <h4 style="color:#166534; margin-bottom:12px; font-size:1.2rem;">🔗 Links para Pesquisa e Estudo</h4>
            <ul style="margin:0; padding-left:20px;">${lis}</ul>
        </div>`;
    }

    container.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 5px 25px rgba(0,0,0,0.08); border-top: 8px solid #004d80;">
            <div style="border-bottom: 3px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">
                <span style="background: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.95rem; display: inline-block; margin-bottom: 12px;">
                    PLANO DE AULA: ${plano.disciplina.toUpperCase()}
                </span>
                <h2 style="color: #0f172a; font-size: 2rem; margin-top: 5px; margin-bottom: 15px; font-weight: 800; text-transform: uppercase;">${plano.titulo}</h2>
                <p style="color: #475569; font-size: 1.1rem; margin: 0;"><strong>Objetos de Conhecimento:</strong> ${plano.objetos}</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 35px;">
                <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1;">
                    <strong style="color: #334155;">Ano Escolar:</strong><br><span style="color: #0f172a; font-weight: 600; font-size: 1.1rem;">${plano.ano}</span>
                </div>
                <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1;">
                    <strong style="color: #334155;">Duração:</strong><br><span style="color: #0f172a; font-weight: 600; font-size: 1.1rem;">${plano.duracao}</span>
                </div>
                <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1;">
                    <strong style="color: #334155;">Tema Central:</strong><br><span style="color: #0f172a; font-weight: 600; font-size: 1.1rem;">${plano.tema}</span>
                </div>
            </div>

            <div style="background: #eff6ff; padding: 30px; border-radius: 12px; margin-bottom: 35px; border-left: 8px solid #3b82f6;">
                <h4 style="color: #1d4ed8; font-size: 1.2rem; margin-bottom: 15px;">📚 Alinhamento Estratégico à BNCC</h4>
                <div style="color: #1e3a8a; font-size: 1rem; line-height: 1.7; padding-left: 10px;">${plano.bncc}</div>
            </div>

            <div style="margin-bottom: 40px;">
                <h3 style="color: #004d80; font-size: 1.3rem; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Objetivo Geral</h3>
                <p style="color: #334155; font-size: 1.1rem; line-height: 1.6; font-weight: 500;">${plano.objetivo}</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 45px;">
                <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #475569; margin-bottom: 12px;">🛠 Recursos Necessários</h4>
                    <p style="color: #334155; font-size: 1rem;">${plano.recursos}</p>
                </div>
                <div style="background: #f0fdfa; padding: 25px; border-radius: 12px; border: 1px solid #ccfbf1;">
                    <h4 style="color: #0f766e; margin-bottom: 12px;">📱 Como utilizar o PAR?</h4>
                    <p style="color: #115e59; font-size: 1rem;">${plano.usoPar}</p>
                </div>
            </div>

            <div style="margin-bottom: 40px;">
                <h3 style="color: #004d80; font-size: 1.4rem; margin-bottom: 25px;">🔄 Fluxograma de Desenvolvimento</h3>
                ${htmlDesenvolvimento}
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 40px;">
                <div style="background: #f0fdf4; padding: 30px; border-radius: 12px; border-top: 6px solid #16a34a;">
                    <h4 style="color: #166534; font-size: 1.2rem; margin-bottom: 15px;">✅ Avaliação</h4>
                    <p style="color: #14532d; font-size: 1rem; line-height: 1.6;">${plano.avaliacao}</p>
                </div>
                <div style="background: #fffbeb; padding: 30px; border-radius: 12px; border-top: 6px solid #d97706;">
                    <h4 style="color: #b45309; font-size: 1.2rem; margin-bottom: 15px;">💡 Adaptações Inclusivas</h4>
                    <p style="color: #78350f; font-size: 1rem; line-height: 1.6;">${plano.adaptacoes}</p>
                </div>
            </div>
            
            ${htmlMultimedia}
            ${htmlLinks}
        </div>
    `;

    mudarTela('tela-detalhe-plano');
}

/* =========================================================================
   7. GESTÃO DE VÍDEOS CONCLUÍDOS E CARREGAMENTO
========================================================================= */
function obterVideosConcluidos() {
    let dados = localStorage.getItem('par_videos_concluidos');
    if (dados) try { return JSON.parse(dados); } catch(e) {}
    return new Array(videosFormacao.length).fill(false);
}

function alternarConcluidoVideo(index) {
    let concluidos = obterVideosConcluidos();
    concluidos[index] = !concluidos[index];
    localStorage.setItem('par_videos_concluidos', JSON.stringify(concluidos));
    carregarVideosDOM(window.linksVideosAtuais);
}

async function carregarVideos() {
    const container = document.getElementById('lista-videos-container');
    if (!container) return;
    
    let configLocal = obterConfigGeral();
    let linksVideos = configLocal.videos || videosFormacao.map(() => "");

    try {
        const resposta = await fetch('videos.json?' + new Date().getTime());
        if (resposta.ok) {
            const dadosJson = await resposta.json();
            if (dadosJson && dadosJson.videos) {
                linksVideos = dadosJson.videos;
            }
        }
    } catch (e) {}
    
    window.linksVideosAtuais = linksVideos;
    carregarVideosDOM(linksVideos);
}

function carregarVideosDOM(linksVideos) {
    const container = document.getElementById('lista-videos-container');
    let concluidos = obterVideosConcluidos();
    container.innerHTML = ''; 

    container.innerHTML += `
        <div style="background: linear-gradient(135deg, #f0fdf4, #e0f2fe); border: 1px solid #bae6fd; border-radius: 16px; padding: 30px; margin-bottom: 35px; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
            <h3 style="color: #0369a1; font-size: 1.35rem; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <span>🎯</span> Objetivo Geral da Trilha Formativa
            </h3>
            <p style="color: #334155; font-size: 1.05rem; line-height: 1.7; margin: 0;">
                Oferecer aos professores conhecimentos e orientações para compreender a Educação Ambiental e a Educação Hídrica, realizar uma leitura socioambiental do território, conhecer o Rio Jaguaribe, compreender o PAR e utilizá-lo como recurso pedagógico em diferentes componentes curriculares.
            </p>
        </div>
    `;

    videosFormacao.forEach((v, index) => {
        let link = linksVideos[index] || v.link || ""; 
        let idLimpo = extrairIdYoutube(link);
        let estaConcluido = concluidos[index];
        
        let embed = idLimpo ? `<iframe src="https://www.youtube.com/embed/${idLimpo}" allowfullscreen style="width:100%;height:100%;position:absolute;top:0;left:0;border:0;"></iframe>` : `
            <div style="padding: 70px 20px; text-align: center; background: #0f172a; color: #94a3b8; font-weight: 600; font-size: 1.1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                <span style="font-size: 2.5rem;">▶️</span>
                <span>Vídeo Módulo ${index + 1} — Aguardando publicação do administrador</span>
            </div>
        `;

        let blocoReflexao = v.reflexao ? `
            <div style="background: #fffbeb; border-left: 6px solid #f59e0b; padding: 20px; border-radius: 10px; margin-top: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                <p style="margin: 0; color: #92400e; font-size: 1rem; line-height: 1.6;">${v.reflexao}</p>
            </div>
        ` : '';

        let estiloBotaoConcluido = estaConcluido 
            ? "background: #16a34a; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 0.95rem; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 3px 8px rgba(22,163,74,0.3);"
            : "background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: 8px; font-size: 0.95rem; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;";
        let textoBotaoConcluido = estaConcluido ? "✔ Vídeo Concluído" : "⭕ Marcar como Concluído";

        container.innerHTML += `
            <div style="background: white; border-radius: 18px; padding: 35px; margin-bottom: 35px; box-shadow: 0 8px 25px rgba(0,0,0,0.06); border-top: 8px solid ${estaConcluido ? '#16a34a' : '#004d80'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="background: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 20px; font-size: 0.9rem; font-weight: 700;">MÓDULO ${index + 1} DE 10</span>
                </div>
                
                <h3 style="color: #0f172a; font-size: 1.6rem; margin-bottom: 15px; font-weight: 800; line-height: 1.4;">${v.titulo}</h3>
                
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 25px; margin-bottom: 25px;">
                    <p style="color: #334155; font-size: 1.05rem; line-height: 1.7; margin: 0;">
                        ${v.descricaoResumida}
                    </p>
                </div>
                
                <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 14px; overflow: hidden; background: #000; box-shadow: 0 6px 20px rgba(0,0,0,0.15);">
                    ${embed}
                </div>
                
                ${blocoReflexao}

                <div style="margin-top: 25px; display: flex; justify-content: flex-end; align-items: center;">
                    <button onclick="alternarConcluidoVideo(${index})" style="${estiloBotaoConcluido}">
                        ${textoBotaoConcluido}
                    </button>
                </div>
            </div>
        `;
    });
}

/* =========================================================================
   8. SISTEMA DE MAPA E AVALIAÇÃO DE CAMPO
========================================================================= */
function iniciarPar() { 
    mudarTela('tela-localizacao'); 
    setTimeout(() => { inicializarMapa(); }, 200); 
}

function inicializarMapa() {
    if (typeof L === 'undefined') return;
    if (!mapa) {
        mapa = L.map('mapa').setView([-5.4125, -38.3033], 9);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(mapa);
        mapa.on('click', function(e) { atualizarMarcador(e.latlng.lat, e.latlng.lng); });
    } else { 
        mapa.invalidateSize(); 
    }
}

function atualizarMarcador(lat, lng) {
    latitudeSelecionada = lat.toFixed(6); 
    longitudeSelecionada = lng.toFixed(6);
    if (marcador) { 
        marcador.setLatLng([lat, lng]); 
    } else { 
        marcador = L.marker([lat, lng]).addTo(mapa); 
    }
    document.getElementById('txt-lat').innerText = `Latitude: ${latitudeSelecionada}`;
    document.getElementById('txt-lng').innerText = `Longitude: ${longitudeSelecionada}`;
    document.getElementById('msg-erro-mapa').classList.add('escondido');
}

function continuarParaParametros() {
    if (latitudeSelecionada === null || longitudeSelecionada === null) { 
        document.getElementById('msg-erro-mapa').classList.remove('escondido'); 
        return; 
    }
    indiceAtual = 0; 
    renderizarParametro(); 
    mudarTela('tela-parametros');
}

/* =========================================================================
   9. LÓGICA DOS PARÂMETROS DO PAR
========================================================================= */
function calcularTotal() { 
    return respostas.reduce((acc, val) => acc + (val !== null ? val : 0), 0); 
}

function selecionarOpcao(pontos, e) {
    respostas[indiceAtual] = pontos;
    document.getElementById('msg-erro').classList.add('escondido');
    document.querySelectorAll('.card-opcao').forEach(c => c.classList.remove('selecionada'));
    e.currentTarget.classList.add('selecionada');
    document.getElementById('pontuacao-acumulada-topo').innerText = `Total: ${calcularTotal()} pts`;
}

function renderizarParametro() {
    const p = parametros[indiceAtual];
    document.getElementById('contador-parametro').innerText = `Parâmetro ${indiceAtual + 1} de 17`;
    document.getElementById('barra-progresso').style.width = `${((indiceAtual) / 17) * 100}%`;
    document.getElementById('pontuacao-acumulada-topo').innerText = `Total: ${calcularTotal()} pts`;
    document.getElementById('msg-erro').classList.add('escondido');

    document.getElementById('nome-parametro').innerText = p.nomeAcessivel.toUpperCase();
    document.getElementById('nome-cientifico').innerText = `Técnico: ${p.nomeOriginal}`;
    
    // Substituído pelas caixas e formatações exatas que o utilizador já possuía
    document.getElementById('texto-oque').innerText = p.pergunta;
    document.getElementById('texto-porque').innerText = p.porQueImporta;
    document.getElementById('texto-como').innerText = p.oqueObservar;
    document.getElementById('texto-discussao').innerText = p.discussao;

    const container = document.getElementById('opcoes-container');
    container.innerHTML = '';
    p.opcoes.forEach(opcao => {
        const div = document.createElement('div');
        div.className = `card-opcao ${respostas[indiceAtual] === opcao.pontos ? 'selecionada' : ''}`;
        div.onclick = (e) => selecionarOpcao(opcao.pontos, e);
        div.innerHTML = `<img src="img/p${indiceAtual + 1}_${opcao.pontos}.png" alt="${opcao.pontos} pontos" style="width:100%;height:140px;object-fit:cover;" onerror="this.onerror=null; this.src='img/p${indiceAtual + 1}_${opcao.pontos}.jpg';"><div class="conteudo-opcao"><div class="texto-opcao">${opcao.texto}</div><div style="text-align:center;"><span class="tag-pontos tag-${opcao.pontos}">${opcao.pontos} pontos</span></div></div>`;
        container.appendChild(div);
    });

    document.getElementById('btn-anterior').style.visibility = indiceAtual === 0 ? 'hidden' : 'visible';
    document.getElementById('btn-proximo').innerText = indiceAtual === 16 ? 'FINALIZAR AVALIAÇÃO' : 'PRÓXIMO →';
}

function proximoParametro() {
    if (respostas[indiceAtual] === null) { 
        document.getElementById('msg-erro').classList.remove('escondido'); 
        return; 
    }
    if (indiceAtual < 16) { 
        indiceAtual++; 
        renderizarParametro(); 
    } else { 
        gerarResultados(); 
    }
}

function parametroAnterior() { 
    if (indiceAtual > 0) { 
        indiceAtual--; 
        renderizarParametro(); 
    } 
}

function classificarPAR(total) {
    if (total >= 64) {
        return { 
            classe: "Ambiente Natural / Conservado", 
            cor: "var(--classe1)", 
            inter: "🌱 O trecho avaliado apresenta características naturais muito bem conservadas. A vegetação ripária (mata ciliar) cumpre o seu papel de proteger as margens contra a erosão e filtrar poluentes. Há uma excelente diversidade de habitats no fundo do rio, garantindo abrigo e alimento para a fauna aquática. Não existem impactos humanos graves ou fontes de poluição visíveis. Este é um ecossistema equilibrado que deve servir como modelo de preservação para a comunidade." 
        };
    }
    if (total >= 39) {
        return { 
            classe: "Alterações Reduzidas", 
            cor: "var(--classe2)", 
            inter: "⚠️ O ambiente apresenta sinais de intervenção humana, mas as alterações ainda são reduzidas. É possível notar impactos pontuais, como falhas na mata ciliar, presença ocasional de lixo ou leve erosão. Apesar disso, o rio mantém grande parte de suas funções ecológicas e consegue sustentar a vida aquática. É o cenário ideal para aplicar ações preventivas de Educação Ambiental com os alunos, impedindo que a degradação avance." 
        };
    }
    if (total >= 26) {
        return { 
            classe: "Alterações Moderadas a Significativas", 
            cor: "var(--classe3)", 
            inter: "🚨 Sinal de alerta! O trecho apresenta alterações socioambientais preocupantes. Observa-se uma clara perda de habitats naturais, supressão severa da mata ciliar, processos de assoreamento, possíveis lançamentos de efluentes ou acúmulo de resíduos sólidos. A saúde do rio está comprometida e a biodiversidade local encontra-se sob forte pressão. Este resultado exige a mobilização da comunidade escolar para propor ações imediatas de limpeza, recuperação e conscientização local." 
        };
    }
    return { 
        classe: "Alterações Extremas / Forte Degradação", 
        cor: "var(--classe4)", 
        inter: "❌ Situação crítica! O ambiente encontra-se num estado de degradação ambiental extrema. As características naturais do rio foram praticamente destruídas por forte urbanização, poluição severa, estagnação da água, desmatamento total ou impermeabilização das margens. A capacidade de sustentar vida aquática saudável é quase nula. Aqui, os alunos devem refletir sobre a necessidade urgente de intervenções estruturais do poder público aliadas a um profundo trabalho de recuperação socioambiental." 
    };
}

function gerarResultados() {
    const total = calcularTotal();
    document.getElementById('pontuacao-final').innerText = total;
    const classificacao = classificarPAR(total);
    
    document.getElementById('caixa-classificacao').style.backgroundColor = classificacao.cor;
    document.getElementById('texto-classificacao').innerText = classificacao.classe;
    document.getElementById('interpretacao-classificacao').innerText = classificacao.inter;

    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';
    respostas.forEach((nota, i) => { 
        tbody.innerHTML += `<tr><td><strong>P${i + 1}</strong> - ${parametros[i].nomeAcessivel}</td><td><b>${nota}</b></td></tr>`; 
    });
    document.getElementById('tabela-total').innerText = total;
    mudarTela('tela-resultados');
}

function revisarAvaliacao() { 
    indiceAtual = 0; 
    renderizarParametro(); 
    mudarTela('tela-parametros'); 
}

function salvarDiagnostico() {
    // 1. Captura as informações usando os IDs exatos do seu HTML
    const campoMunicipio = document.getElementById('municipio'); 
    const campoTrecho = document.getElementById('trecho');
    const campoData = document.getElementById('data'); 
    const campoAvaliador = document.getElementById('avaliador');
    const campoObservacoes = document.getElementById('obs');

    // Valida e extrai os valores (se estiver vazio, coloca "Não informado")
    const municipio = (campoMunicipio && campoMunicipio.value.trim() !== "") ? campoMunicipio.value.trim() : "Não informado";
    const trecho = (campoTrecho && campoTrecho.value.trim() !== "") ? campoTrecho.value.trim() : "Não informado";
    
    // Converte a data de YYYY-MM-DD para DD/MM/YYYY para ficar elegante no relatório
    let dataAvaliacao = new Date().toLocaleDateString('pt-BR');
    if (campoData && campoData.value.trim() !== "") {
        const partesData = campoData.value.split('-');
        if (partesData.length === 3) {
            dataAvaliacao = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
        } else {
            dataAvaliacao = campoData.value;
        }
    }

    const avaliador = (campoAvaliador && campoAvaliador.value.trim() !== "") ? campoAvaliador.value.trim() : "Não informado";
    const observacoes = (campoObservacoes && campoObservacoes.value.trim() !== "") ? campoObservacoes.value.trim() : "Nenhuma observação registrada.";

    const total = calcularTotal();
    const classificacao = classificarPAR(total);

    // 2. Constrói o Relatório Completo Estruturado
    let txt = `==========================================================\n`;
    txt += `        RELATÓRIO TÉCNICO - AVALIAÇÃO PAR EDUCACIONAL\n`;
    txt += `==========================================================\n\n`;
    
    txt += `📌 INFORMAÇÕES GERAIS\n`;
    txt += `----------------------------------------------------------\n`;
    txt += `Data da Avaliação : ${dataAvaliacao}\n`;
    txt += `Nome do Avaliador : ${avaliador}\n`;
    txt += `Município/Estado  : ${municipio}\n`;
    txt += `Ponto / Trecho    : ${trecho}\n`;
    
    // As coordenadas já estão guardadas nas variáveis globais do mapa
    if (latitudeSelecionada && longitudeSelecionada) {
        txt += `Coordenadas (GPS) : Latitude ${latitudeSelecionada} | Longitude ${longitudeSelecionada}\n`;
    } else {
        txt += `Coordenadas (GPS) : Não registradas no mapa\n`;
    }
    txt += `Observações       : ${observacoes}\n\n`;

    txt += `📊 NOTAS DETALHADAS DOS PARÂMETROS\n`;
    txt += `----------------------------------------------------------\n`;
    respostas.forEach((nota, i) => { 
        // Formata o número do parâmetro com zero à esquerda (ex: 01, 02)
        let num = String(i + 1).padStart(2, '0');
        txt += `Parâmetro ${num} - ${parametros[i].nomeAcessivel}: ${nota} pontos\n`;
    });
    txt += `\n`;

    txt += `🎯 RESULTADO FINAL DO DIAGNÓSTICO\n`;
    txt += `----------------------------------------------------------\n`;
    txt += `Pontuação Total   : ${total} de 85 pontos\n`;
    txt += `Classificação     : ${classificacao.classe.toUpperCase()}\n\n`;
    
    txt += `📝 PARECER TÉCNICO E PEDAGÓGICO\n`;
    txt += `----------------------------------------------------------\n`;
    txt += `${classificacao.inter}\n\n`;
    txt += `==========================================================\n`;
    txt += `Produto educacional vinculado ao Mestrado Profissional em Rede Nacional em Gestão e Regulação de Recursos Hídricos - ProfÁgua\n`;

    // 3. Gera e faz o download do ficheiro .txt
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    
    // O nome do ficheiro agora usa o nome do trecho de forma automática
    let nomeTrechoLimpo = trecho !== "Não informado" ? trecho.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() : "local";
    link.download = `Relatorio_PAR_${nomeTrechoLimpo}_${new Date().getTime()}.txt`;
    link.click();
}
function novaAvaliacao() {
    if (confirm("Iniciar nova avaliação?")) { 
        respostas.fill(null); 
        indiceAtual = 0; 
        latitudeSelecionada = null; 
        longitudeSelecionada = null; 
        mudarTela('tela-inicio'); 
    }
}

/* =========================================================================
   SISTEMA DE VALIDAÇÃO E LIBERAÇÃO IMEDIATA DO CERTIFICADO
========================================================================= */
function toggleSecaoQuestionario() { 
    const s = document.getElementById('secao-avaliacao-diagnostica'); 
    if (s) {
        s.classList.toggle('escondido'); 
        if (!s.classList.contains('escondido')) {
            s.style.display = 'block';
            s.scrollIntoView({ behavior: 'smooth' }); 
        }
    }
}

function enviarAvaliacaoDiagnostica(e) {
    if (e && e.preventDefault) e.preventDefault(); // Impede recarregamento da página

    const nomeInput = document.getElementById('diag-nome');
    const assistiuOpcao = document.querySelector('input[name="diag-assistiu"]:checked');
    
    if (!nomeInput || !nomeInput.value.trim()) {
        alert("Por favor, preencha o seu nome completo.");
        return false;
    }

    if (!assistiuOpcao) {
        alert("Por favor, selecione se assistiu a todas as aulas.");
        return false;
    }

    if (assistiuOpcao.value !== "Sim") {
        alert("É necessário assistir a todas as aulas da formação para ter direito à emissão do certificado.");
        return false;
    }

    const nomeCompleto = nomeInput.value.trim();

    // 1. Libera o certificado IMEDIATAMENTE localmente
    finalizarEAtivarCertificado(nomeCompleto);

    // 2. Envia a confirmação para o Formspree em segundo plano (sem travar a tela)
    const dados = { 
        _subject: `Conclusão de Formação - ${nomeCompleto}`, 
        nome: nomeCompleto, 
        assistiu_todas_aulas: assistiuOpcao.value,
        data_confirmacao: new Date().toLocaleString('pt-BR')
    };

    fetch('https://formspree.io/f/mgavdpwj', { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
        body: JSON.stringify(dados) 
    }).catch(err => console.log("Registro em segundo plano:", err));

    return false;
}

function finalizarEAtivarCertificado(nome) {
    // Salva o estado no navegador
    localStorage.setItem('par_diagnostico_concluido', 'true'); 
    localStorage.setItem('par_nome_cursista', nome);
    
    // Executa a liberação visual
    liberarCertificadoUI(nome);
    
    alert("Confirmação realizada com sucesso! O seu certificado foi liberado."); 
    
    // Oculta o formulário de confirmação e rola suavemente para o certificado
    const secaoForm = document.getElementById('secao-avaliacao-diagnostica');
    if (secaoForm) secaoForm.classList.add('escondido');
    
    const blocoCert = document.getElementById('bloco-certificado-container') || document.getElementById('bloco-certificado');
    if (blocoCert) blocoCert.scrollIntoView({ behavior: 'smooth' });
}

function verificarStatusDiagnostico() { 
    if (localStorage.getItem('par_diagnostico_concluido') === 'true') {
        const nomeSalvo = localStorage.getItem('par_nome_cursista') || "Participante";
        liberarCertificadoUI(nomeSalvo); 
    }
}

function liberarCertificadoUI(nome) {
    // Busca por possíveis IDs do bloco do certificado
    const bloco = document.getElementById('bloco-certificado-container') || document.getElementById('bloco-certificado');
    
    if (bloco) { 
        bloco.style.opacity = '1'; 
        bloco.style.pointerEvents = 'auto'; 
        bloco.style.display = 'block';
        bloco.classList.remove('escondido', 'bloqueado');
    }

    // Esconde a mensagem de aviso/bloqueio
    const msgBloqueio = document.getElementById('msg-bloqueio-certificado') || document.getElementById('msg-bloqueio');
    if (msgBloqueio) msgBloqueio.style.display = 'none'; 

    // Mostra o status de liberado
    const statusDiag = document.getElementById('status-diagnostico');
    if (statusDiag) statusDiag.classList.remove('escondido');
    
    // Preenche o nome e habilita o campo e botões
    const inputNomeCert = document.getElementById('nome-cursista'); 
    if (inputNomeCert) { 
        inputNomeCert.value = nome; 
        inputNomeCert.removeAttribute('readonly'); 
        inputNomeCert.removeAttribute('disabled');
        inputNomeCert.style.background = '#ffffff'; 
    }

    // Garante que todos os botões dentro do bloco do certificado fiquem ativos
    if (bloco) {
        const botoes = bloco.querySelectorAll('button, input[type="button"]');
        botoes.forEach(btn => {
            btn.removeAttribute('disabled');
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        });
    }
}

// === CÓDIGO DO CERTIFICADO COM DATA AUTOMÁTICA E TEXTO CENTRALIZADO ===
function gerarCertificadoPDF() {
    const inputNome = document.getElementById('nome-cursista');
    if (!inputNome) {
        alert("Campo de nome não encontrado.");
        return;
    }
    const nome = inputNome.value.trim();
    if (!nome) {
        alert("Por favor, insira o seu nome completo.");
        return;
    }
    
    let config = obterConfigGeral(); 
    const jsPDF = window.jspdf.jsPDF;
    const canvasF = document.createElement('canvas'); 
    const ctxF = canvasF.getContext('2d');
    const imgF = new Image(); 
    
    imgF.crossOrigin = "Anonymous"; 
    imgF.src = config.imgCertificadoFrenteBase64 || 'img/certificado_frente.png';
    
    imgF.onload = () => {
        canvasF.width = imgF.width; 
        canvasF.height = imgF.height; 
        ctxF.drawImage(imgF, 0, 0);
        
        ctxF.font = '22px Arial, sans-serif'; 
        ctxF.fillStyle = '#1e293b'; 
        ctxF.textAlign = 'center';
        ctxF.textBaseline = 'middle';

        // Identificação automática da data atual
        const dataAtual = new Date().toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        const textoCertificado = `Certificamos que ${nome.toUpperCase()} participou da formação “FORMAÇÃO EM EDUCAÇÃO HÍDRICA E EDUCAÇÃO AMBIENTAL”, realizada em Jaguaribe-CE, em ${dataAtual}, com carga horária total de 10 (dez) horas. Produto educacional vinculado ao Mestrado Profissional em Rede Nacional em Gestão e Regulação de Recursos Hídricos – ProfÁgua/UFERSA.`;
        
        const larguraMaxima = canvasF.width * 0.78; 
        const alturaLinha = 34;
        
        let palavras = textoCertificado.split(' ');
        let linhas = [];
        let linhaAtual = '';

        for (let n = 0; n < palavras.length; n++) {
            let testeLinha = linhaAtual + palavras[n] + ' ';
            let medida = ctxF.measureText(testeLinha);
            if (medida.width > larguraMaxima && n > 0) {
                linhas.push(linhaAtual.trim());
                linhaAtual = palavras[n] + ' ';
            } else {
                linhaAtual = testeLinha;
            }
        }
        linhas.push(linhaAtual.trim());

        let posYInicial = (canvasF.height * 0.47) - ((linhas.length - 1) * alturaLinha) / 2;

        for (let k = 0; k < linhas.length; k++) {
            ctxF.fillText(linhas[k], canvasF.width / 2, posYInicial + (k * alturaLinha));
        }

        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvasF.width, canvasF.height] });
        pdf.addImage(canvasF.toDataURL('image/png'), 'PNG', 0, 0, canvasF.width, canvasF.height);
        
        const imgV = new Image(); 
        imgV.crossOrigin = "Anonymous"; 
        imgV.src = config.imgCertificadoVersoBase64 || 'img/certificado_verso.png';
        
        imgV.onload = () => {
            const canvasV = document.createElement('canvas'); 
            canvasV.width = imgV.width; 
            canvasV.height = imgV.height;
            canvasV.getContext('2d').drawImage(imgV, 0, 0); 
            pdf.addPage([canvasV.width, canvasV.height], 'landscape'); 
            pdf.addImage(canvasV.toDataURL('image/png'), 'PNG', 0, 0, canvasV.width, canvasV.height);
            pdf.save(`Certificado_${nome.replace(/\s+/g, '_')}.pdf`);
        };
        imgV.onerror = () => pdf.save(`Certificado_${nome.replace(/\s+/g, '_')}.pdf`);
    };
    imgF.onerror = () => alert("Erro ao carregar a imagem 'img/certificado_frente.png'.");
}

/* =========================================================================
   11. INICIALIZAÇÃO AUTOMÁTICA AO CARREGAR A PÁGINA
========================================================================= */
window.onload = function() { 
    carregarPlanos(); 
    carregarVideos();
    verificarStatusDiagnostico();
    document.querySelectorAll('.tela').forEach(t => {
        if (!t.classList.contains('ativa')) t.style.display = 'none';
    });
};

/* =========================================================================
   CONTROLO DO MENU LATERAL (SIDEBAR) - CONCEITO 1
========================================================================= */
function toggleMenuLateral() {
    const sidebar = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay-menu');
    if (sidebar && overlay) {
        const estaAberta = sidebar.classList.toggle('aberta');
        overlay.classList.toggle('ativo');
        sidebar.setAttribute('aria-hidden', !estaAberta);
    }
}

function navegarEMeFechar(idTela, elementoBotao) {
    // 1. Navega mantendo as suas funções originais intocadas
    mudarTela(idTela);
    
    // 2. Fecha o menu
    toggleMenuLateral();
    
    // 3. Atualiza o aspeto visual indicando qual é o menu ativo
    document.querySelectorAll('.btn-menu-lateral').forEach(btn => btn.classList.remove('ativo'));
    if (elementoBotao) {
        elementoBotao.classList.add('ativo');
    }
}

// Fechar com a tecla ESC para Acessibilidade
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const sidebar = document.getElementById('menu-lateral');
        if (sidebar && sidebar.classList.contains('aberta')) {
            toggleMenuLateral();
        }
    }
});