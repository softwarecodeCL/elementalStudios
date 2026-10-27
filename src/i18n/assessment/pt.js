import feedback from "./feedback-pt.js";
export default {
  jsRequired:
    "Ative o JavaScript para fazer o diagnóstico. As instruções desta página continuam disponíveis.",
  metaTitle: "Diagnóstico de inglês TOEIC | Elemental Studios",
  metaDescription:
    "Explore seu inglês com 36 questões de Listening e Reading, áudios e um relatório de habilidades. Diagnóstico orientativo gratuito de cerca de 25 minutos.",
  eyebrow: "DIAGNÓSTICO DE INGLÊS",
  title: "Conheça seu ponto de partida.",
  accent: "Dê direção à sua aprendizagem.",
  intro:
    "Explore como você compreende o inglês em contextos de trabalho. Responda no seu ritmo e receba um relatório para decidir o que praticar depois.",
  free: "GRATUITO · SEM CADASTRO",
  minutes: "Cerca de 25 min",
  questionCount: "36 questões",
  sections: "Listening + Reading",
  stepsTitle: "Antes de começar",
  steps: [
    {
      title: "Prepare seu espaço",
      text: "Procure um lugar tranquilo, tenha seus fones de ouvido à mão e confira o som. Reserve cerca de 25 minutos para responder com atenção.",
    },
    {
      title: "Responda com o que sabe",
      text: "Evite tradutores e ajuda externa. Leia as instruções de cada parte e escolha uma resposta por questão. Você pode voltar aos blocos anteriores.",
    },
    {
      title: "Aprenda com seus resultados",
      text: "Ao concluir, você verá acertos, habilidades e explicações. O diagnóstico não avalia expressão oral ou escrita e não substitui um exame oficial.",
    },
  ],
  outlineTitle: "O que você vai encontrar",
  outlineIntro:
    "36 questões em 23 blocos. Alguns textos e conversas reúnem várias questões.",
  listeningDesc: "Perguntas e respostas, conversas e mensagens.",
  readingDesc: "Frases, textos incompletos e compreensão de leitura.",
  countLabel: "{count} questões",
  parts: {
    2: {
      name: "Pergunta e resposta",
      instruction:
        "Ouça a pergunta ou afirmação e as três respostas do áudio. As respostas não aparecem por escrito. Escolha A, B ou C.",
    },
    3: {
      name: "Conversas",
      instruction:
        "Leia primeiro as perguntas. Depois ouça a conversa e escolha a melhor resposta para cada uma.",
    },
    4: {
      name: "Falas e mensagens",
      instruction:
        "Leia as perguntas antes de ouvir. Identifique o objetivo da mensagem e os detalhes necessários para responder.",
    },
    5: {
      name: "Frases incompletas",
      instruction:
        "Leia a frase inteira. Escolha a palavra ou expressão adequada ao significado e à estrutura.",
    },
    6: {
      name: "Completar textos",
      instruction:
        "Leia o texto completo e preencha as lacunas. Uma delas exige uma frase inteira: considere também as frases ao redor.",
    },
    7: {
      name: "Compreensão de leitura",
      instruction:
        "Leia o documento e responda com base nas informações apresentadas. Algumas questões exigem inferência; outras pedem detalhes específicos.",
    },
  },
  partLabel: "Parte {part}",
  soundTitle: "Confira o som",
  soundIntro:
    "Ouça um sinal breve antes de começar. Esta verificação não consome reproduções do diagnóstico.",
  soundButton: "Reproduzir som de teste",
  soundSuccess:
    "O sinal foi reproduzido. Se não ouviu, confira o volume e a saída de áudio.",
  soundError:
    "Não foi possível reproduzir o sinal. Verifique as configurações de som do navegador.",
  setupTitle: "Seu diagnóstico, no seu ritmo",
  name: "Nome (opcional)",
  namePlaceholder: "Como você se chama?",
  target: "Meta TOEIC (opcional)",
  targetUnknown: "Ainda não tenho uma meta",
  targetPoints: "{score} pontos",
  ready: "Tenho um espaço tranquilo e o áudio está pronto.",
  start: "Começar diagnóstico",
  resume: "Retomar meu diagnóstico",
  viewSaved: "Ver meu último relatório",
  resumeHint: "Há um diagnóstico salvo neste navegador.",
  restart: "Começar novamente",
  restartConfirm: "Deseja apagar esta tentativa e começar uma nova?",
  localNote:
    "Seu progresso é salvo neste navegador. Não pedimos e-mail nem enviamos suas respostas a um servidor.",
  rulesTitle: "Como funciona",
  rules: [
    "O tempo é uma referência: não há encerramento automático.",
    "Cada áudio permite até duas reproduções; voltar não reinicia a contagem.",
    "A transcrição é um recurso de acessibilidade. Seu uso aparecerá no relatório.",
    "Você pode pausar e retomar neste navegador. O tempo de pausa não é somado.",
  ],
  scope:
    "Exercícios inspirados nas partes 2 a 7 de TOEIC Listening & Reading. Não inclui fotografias da parte 1, expressão oral ou escrita.",
  notice:
    "Este diagnóstico é orientativo. TOEIC é uma marca registrada da ETS. Esta ferramenta não é afiliada nem endossada pela ETS.",
  progress: "Progresso do diagnóstico",
  progressText: "{answered} de {total} respondidas",
  block: "Bloco {current} de {total}",
  elapsed: "Tempo ativo",
  pause: "Pausar",
  pausedTitle: "Um momento para você.",
  pausedText:
    "Seu progresso está salvo. O áudio e o tempo ativo estão pausados. Retome quando estiver pronto.",
  continue: "Continuar diagnóstico",
  exit: "Voltar às instruções",
  question: "Questão {number}",
  choose: "Escolha a melhor resposta.",
  previous: "Bloco anterior",
  next: "Próximo bloco",
  finish: "Ver meu diagnóstico",
  answerHint: "Escolha uma resposta em cada questão para continuar.",
  audio: "Áudio do bloco",
  play: "Reproduzir áudio",
  pauseAudio: "Pausar áudio",
  resumeAudio: "Continuar áudio",
  replay: "Ouvir novamente",
  noPlays: "Reproduções utilizadas",
  playing: "Reproduzindo…",
  remaining: "{count} de 2 reproduções disponíveis",
  audioError:
    "Não foi possível carregar o áudio. Tente novamente ou consulte a transcrição.",
  transcriptShow: "Ver transcrição de apoio",
  transcriptHide: "Ocultar transcrição",
  transcriptNote:
    "O uso deste recurso é registrado para interpretar o resultado de Listening.",
  audioHelp:
    "Leia as perguntas antes de reproduzir. Áudios e questões permanecem em inglês.",
  reading: "Texto de leitura",
  saveError:
    "Não foi possível salvar o progresso. Você pode continuar, mas evite fechar esta aba.",
  resultEyebrow: "SEU DIAGNÓSTICO",
  resultTitle: "Seu próximo passo, mais claro.",
  resultIntro:
    "Este resultado resume seu desempenho nas questões desta amostra. Use-o para orientar a prática e conversar sobre sua capacitação.",
  accuracy: "Acertos nesta amostra",
  correct: "{correct} de {total} corretas",
  reference: "Referência TOEIC do protótipo",
  referenceScale: "Escala orientativa 10–990",
  referenceNote:
    "A conversão do protótipo é aproximada e não foi validada com o TOEIC. Não prevê uma pontuação oficial. As referências do QECR por seção derivam da mesma estimativa e não certificam um nível.",
  cefr: "Referência do QECR",
  cefrBelow: "Abaixo de A1",
  goal: "Meta escolhida: {score}",
  goalNote:
    "A meta orienta sua preparação; confirme seu progresso com uma avaliação completa.",
  transcriptResult:
    "Blocos com transcrição: {count}. Interprete Listening como prática com apoio.",
  playsResult: "Blocos com repetição de áudio: {count}.",
  priorityTitle: "Por onde começar",
  priorityIntro:
    "Estas habilidades oferecem maior oportunidade de prática nesta amostra.",
  allStrong:
    "Nenhuma habilidade ficou abaixo de 80% nesta amostra. O próximo passo é praticar com uma avaliação mais ampla.",
  skillMap: "Seu mapa de habilidades",
  sampleNote:
    "Cada habilidade se baseia em poucas questões. Os resultados descrevem esta amostra e podem variar em uma avaliação mais ampla.",
  priority: "Prioridade",
  practice: "Reforçar",
  strength: "Ponto forte nesta amostra",
  reviewTitle: "Entenda cada resposta",
  reviewIntro:
    "Abra uma questão para revisar sua escolha, a resposta correta e a explicação.",
  yourAnswer: "Sua resposta",
  rightAnswer: "Resposta correta",
  notAnswered: "Sem resposta",
  correctLabel: "Correta",
  incorrectLabel: "Para reforçar",
  download: "Baixar relatório PDF",
  reportGenerating: "Preparando PDF…",
  reportError: "Não foi possível gerar o PDF. Tente novamente ou use Imprimir relatório.",
  print: "Imprimir relatório",
  reportFilename: "relatorio-ingles-elemental.pdf",
  reportTitle: "Diagnóstico orientativo de inglês · Elemental Studios",
  ctaTitle: "Dê continuidade à sua aprendizagem.",
  ctaText:
    "Vamos conversar sobre as necessidades da sua equipe e um programa de inglês ou português para sua empresa.",
  cta: "Falar com a Elemental Studios",
  retake: "Repetir diagnóstico",
  storageVersion:
    "A tentativa anterior não é compatível com esta versão. Você pode começar uma nova.",
  ...feedback,
};
