/**
 * content.mjs
 * ---------------------------------------------------------------------------
 * Every word on the site, in English and Portuguese, in one place.
 * The template (template.mjs) only arranges these strings; edit text here.
 *
 * Rules for this copy:
 *   - Facts match the original portfolio; no client names, IDs or numbers
 *     that could identify the employer.
 *   - Contact is email only (no phone), by the owner's choice.
 *   - Plain, first-person sentences. No buzzwords.
 * ---------------------------------------------------------------------------
 */

export const SITE_URL = 'https://igor-hoc-cruz.github.io';
export const EMAIL = 'Igorhoc0@gmail.com';
export const GITHUB = 'https://github.com/igor-hoc-cruz';

/* ===== Case studies =====================================================
 * tag    : filter group (must exist in `filters` of each language)
 * status : live | progress | personal
 * size   : wide cards take the full row on desktop
 * ======================================================================== */
const CASES = [
  {
    id: 'deliverability', tag: 'email', status: 'live', size: 'wide',
    tools: ['GoHighLevel', 'Zoho Marketing Automation', 'Cloudflare DNS', 'SPF, DKIM and DMARC'],
    en: {
      title: 'Getting a high-volume sender out of trouble',
      summary: 'Authenticated the sender and cleaned the lists. The domain now holds its warm-up limit of 14,000 sends a day.',
      problem: 'A lot of email going out, a high bounce rate, and a domain with two DMARC records that cancelled each other out.',
      did: 'Backed up the DNS, merged the DMARC records, set up a custom return path and suppressed thousands of invalid addresses and problem domains.',
      result: 'The sender passes SPF, DKIM, DMARC and return path checks, and warm-up sits steadily at 14,000 sends a day.',
    },
    pt: {
      title: 'Tirando um remetente de alto volume do buraco',
      summary: 'Autentiquei o remetente e limpei as listas. O domínio hoje sustenta o limite de aquecimento de 14 mil envios por dia.',
      problem: 'Muito e-mail saindo, taxa de rejeição alta e um domínio com dois registros DMARC que se anulavam.',
      did: 'Fiz backup do DNS, unifiquei o DMARC, criei o caminho de retorno personalizado e suprimi milhares de endereços inválidos e domínios problemáticos.',
      result: 'O remetente passa nas checagens de SPF, DKIM, DMARC e caminho de retorno, e o aquecimento segue estável em 14 mil envios por dia.',
    },
  },
  {
    id: 'lost-leads', tag: 'automation', status: 'live',
    tools: ['n8n', 'Zapier', 'Zoho CRM API', 'Meta Lead Ads'],
    en: {
      title: 'Ad leads that vanished before becoming deals',
      summary: 'Half of one campaign’s leads were being dropped without a trace. I found out why and rebuilt the route.',
      problem: 'The CRM silently rejected anyone whose phone number was already on file, so half the leads from one Meta campaign never became deals.',
      did: 'Traced the runs in n8n and rebuilt the route with duplicate handling, re-entry for the new product, alerts, and the company’s official field standard.',
      result: 'The lost leads came back as deals, every failure now raises an alert, and all sources send channel, UTMs and ad IDs.',
    },
    pt: {
      title: 'Leads de anúncio que sumiam antes de virar negócio',
      summary: 'Metade dos leads de uma campanha se perdia sem deixar rastro. Descobri o motivo e refiz a rota.',
      problem: 'O CRM recusava, sem aviso, quem já tinha o telefone cadastrado, e metade dos leads de uma campanha da Meta nunca virava oportunidade.',
      did: 'Rastreei as execuções no n8n e refiz a rota com tratamento de duplicados, reentrada pelo produto novo, alertas e o padrão oficial de campos da empresa.',
      result: 'Os leads perdidos voltaram como negócios, toda falha gera alerta e todas as fontes enviam canal, UTMs e IDs do anúncio.',
    },
  },
  {
    id: 'lead-source', tag: 'data', status: 'progress',
    tools: ['n8n API', 'JavaScript', 'Zoho Analytics', 'Automated tests'],
    en: {
      title: 'Where do our leads actually come from?',
      summary: 'Almost no lead had a recorded source. The cause was an iframe; the fix is a read-only classifier.',
      problem: 'Leads reached the CRM without a source, so nobody could say what a lead or a customer cost per channel.',
      did: 'Found the cause: the quote form runs inside an iframe that never sees the page’s UTMs. Designed a separate, read-only flow that classifies each lead’s channel.',
      result: 'Classification logic built and tested, writing to Zoho Analytics, without touching any flow already in production.',
    },
    pt: {
      title: 'De onde vêm, de verdade, os nossos leads?',
      summary: 'Quase nenhum lead tinha origem registrada. A causa era um iframe; a solução é um classificador que só lê.',
      problem: 'Os leads chegavam ao CRM sem origem, e ninguém sabia quanto custava um lead ou um cliente em cada canal.',
      did: 'Achei a causa: o formulário de cotação roda dentro de um iframe que não enxerga as UTMs da página. Desenhei um fluxo separado, só de leitura, que classifica o canal de cada lead.',
      result: 'Lógica de classificação pronta e testada, gravando no Zoho Analytics, sem mexer em nenhum fluxo de produção.',
    },
  },
  {
    id: 'trilingual-site', tag: 'web', status: 'live',
    tools: ['WordPress', 'Elementor', 'HTML, CSS and JS', 'Google Tag Manager', 'Meta Pixel'],
    en: {
      title: 'One site, three languages, nothing lost on the way',
      summary: 'Moved 60+ pages to WordPress in Portuguese, Spanish and English, kept every URL, and tracked every download.',
      problem: 'The site sat on an old platform, had no full Spanish or English versions, was slow on phones and had no reliable conversion events.',
      did: 'Migrated 60+ pages to WordPress and Elementor, optimised images and video, set up SEO and share cards, and built e-book and guide pages with forms.',
      result: 'A site in three languages with URLs preserved, and each material download recorded as a Meta conversion through Google Tag Manager.',
    },
    pt: {
      title: 'Um site, três idiomas e nada perdido no caminho',
      summary: 'Levei mais de 60 páginas para o WordPress em português, espanhol e inglês, mantive cada URL e medi cada download.',
      problem: 'O site estava numa plataforma antiga, sem versões completas em espanhol e inglês, lento no celular e sem eventos de conversão confiáveis.',
      did: 'Migrei mais de 60 páginas para WordPress e Elementor, otimizei imagens e vídeo, configurei SEO e cartões de compartilhamento e criei páginas de e-book e guias com formulário.',
      result: 'Site em três idiomas com as URLs preservadas e cada download de material registrado como conversão da Meta via Google Tag Manager.',
    },
  },
  {
    id: 'tiktok-data', tag: 'data', status: 'live',
    tools: ['TikTok Marketing API', 'OAuth', 'n8n', 'Zoho Analytics'],
    en: {
      title: 'Bringing TikTok Ads into the company’s own reports',
      summary: 'Got a Marketing API app approved and 81 columns of campaign data flowing in every day.',
      problem: 'Ads kept getting rejected with no clear reason, and campaign numbers were stuck inside TikTok, away from the company’s reports.',
      did: 'Identified the restricted-category rule behind the rejections, filed the eligibility review and got a Marketing API app approved with read-only scopes.',
      result: 'A daily feed of 81 columns of campaign, ad group and ad data into Zoho Analytics, plus a creative review showing which messages pass the policy.',
    },
    pt: {
      title: 'Trazendo o TikTok Ads para os relatórios da empresa',
      summary: 'Consegui aprovar um app da Marketing API e colocar 81 colunas de dados de campanha entrando todo dia.',
      problem: 'Os anúncios eram reprovados sem motivo claro e os números de campanha ficavam presos no TikTok, longe dos relatórios da empresa.',
      did: 'Identifiquei a regra de categoria restrita por trás das reprovações, abri a revisão de elegibilidade e aprovei um app da Marketing API só com escopos de leitura.',
      result: 'Coleta diária de 81 colunas de campanhas, grupos e anúncios no Zoho Analytics, e uma análise de criativos que mostra quais mensagens passam na política.',
    },
  },
  {
    id: 'hr-portal', tag: 'web', status: 'live',
    tools: ['PHP', 'WordPress REST API', 'Zoho Sign API', 'JavaScript'],
    en: {
      title: 'An HR portal that lives inside the company site',
      summary: 'Custom WordPress plugins for onboarding, requests and contracts signed through Zoho Sign.',
      problem: 'Contractor agreements and onboarding were done by hand, in loose documents with no history.',
      did: 'Wrote WordPress plugins for HR: access, requests, an audit trail, and filled-in contracts sent for signature through Zoho Sign. Every release was tested locally first.',
      result: 'The portal runs inside the existing site with no extra server, and every contract keeps a reusable history.',
    },
    pt: {
      title: 'Um portal de RH que mora dentro do site da empresa',
      summary: 'Plugins WordPress próprios para onboarding, pedidos e contratos assinados pelo Zoho Sign.',
      problem: 'Contratos de prestadores e onboarding eram feitos à mão, em documentos soltos e sem histórico.',
      did: 'Escrevi plugins WordPress para o RH: acessos, pedidos, trilha de auditoria e contratos preenchidos enviados para assinatura no Zoho Sign. Cada versão foi testada localmente antes.',
      result: 'O portal roda dentro do site que já existia, sem servidor extra, e cada contrato guarda um histórico reaproveitável.',
    },
  },
  {
    id: 'light-crm', tag: 'automation', status: 'live',
    tools: ['Google Apps Script', 'GoHighLevel API', 'JavaScript'],
    en: {
      title: 'A CRM a non-technical team actually uses',
      summary: 'A Google Apps Script web app for pipeline, meetings and commissions, covered by 80+ automated tests.',
      problem: 'A small sales team ran its pipeline in spreadsheets and uploaded contact lists to the marketing platform by hand.',
      did: 'Built a web app with pipeline, meetings, commissions and a screen that sends spreadsheets to GoHighLevel in batches, inside the API limit.',
      result: 'Each person keeps their own spreadsheet, and 80+ automated tests cover the rules, the metrics and the uploads.',
    },
    pt: {
      title: 'Um CRM que uma equipe não técnica de fato usa',
      summary: 'Um web app em Google Apps Script com funil, reuniões e comissões, coberto por mais de 80 testes automatizados.',
      problem: 'Uma equipe comercial pequena controlava o funil em planilhas e subia listas de contatos na mão para a plataforma de marketing.',
      did: 'Construí um web app com funil, reuniões, comissões e uma tela que envia planilhas para o GoHighLevel em lotes, dentro do limite da API.',
      result: 'Cada pessoa mantém a própria planilha, e mais de 80 testes automatizados cobrem regras, métricas e envios.',
    },
  },
  {
    id: 'ai-agents', tag: 'ai', status: 'live', size: 'wide',
    tools: ['Claude and Claude Code', 'MCP connectors', 'Scheduled tasks', 'Knowledge bases'],
    en: {
      title: 'Marketing operations with AI agents, and a human holding the keys',
      summary: 'Requests from 13 areas handled by AI agents, with my approval required before anything leaves the building.',
      problem: 'More marketing requests than a lean team could handle, and a real risk of AI publishing, spending or changing data on its own.',
      did: 'Built an internal system that routes requests across 13 areas, requires human approval before any outside action, and works from knowledge bases for the brand and for Zoho.',
      result: 'Tokens per request dropped by 60 to 87 percent, compliance rules apply by default, and every task ends with checks that can be verified.',
    },
    pt: {
      title: 'Operação de marketing com agentes de IA, e um humano com a chave',
      summary: 'Pedidos de 13 áreas atendidos por agentes de IA, com a minha aprovação antes de qualquer coisa sair de casa.',
      problem: 'Mais pedidos de marketing do que uma equipe enxuta dava conta, e um risco real de a IA publicar, gastar ou alterar dados sozinha.',
      did: 'Criei um sistema interno que distribui pedidos entre 13 áreas, exige aprovação humana antes de qualquer ação externa e trabalha com bases de conhecimento da marca e da Zoho.',
      result: 'O consumo de tokens por pedido caiu de 60% a 87%, as regras de compliance valem por padrão e toda tarefa termina com checagens verificáveis.',
    },
  },
  {
    id: 'desktop-character', tag: 'personal', status: 'personal', size: 'wide',
    tools: ['Electron', 'three.js and three-vrm', 'Blender Python API', 'Kokoro TTS', 'Node.js'],
    en: {
      title: 'A 3D desktop character that runs fully offline',
      summary: 'Something I build for myself: a character that reacts and speaks, with lip-sync and no cloud services.',
      problem: 'I wanted to learn real-time 3D and speech end to end, without paid APIs or anything running in the cloud.',
      did: 'Built an Electron app that renders a VRM character with three.js, with about 300 scripted actions and 98 motion clips, plus a close-up face view that syncs lips, blinks and gaze to the voice. A Python pipeline drives Blender to render animation sets.',
      result: 'Everything runs on a laptop. Speech is generated locally with an open-source text-to-speech model, and the face moves with it in real time.',
    },
    pt: {
      title: 'Um personagem 3D de desktop que roda 100% offline',
      summary: 'Algo que construo para mim: um personagem que reage e fala, com sincronia labial e sem nada na nuvem.',
      problem: 'Eu queria aprender 3D em tempo real e voz de ponta a ponta, sem APIs pagas nem nada rodando na nuvem.',
      did: 'Construí um app em Electron que renderiza um personagem VRM com three.js, com cerca de 300 ações programadas e 98 movimentos, e uma vista de rosto em close que sincroniza lábios, piscadas e olhar com a voz. Um pipeline em Python comanda o Blender para renderizar as animações.',
      result: 'Tudo roda num notebook. A fala é gerada localmente com um modelo de voz open source, e o rosto acompanha em tempo real.',
    },
  },
];

/* ===== Interface text per language ====================================== */
export const LANGS = {
  en: {
    htmlLang: 'en',
    path: '/',
    title: 'Igor Cruz, marketing operations and automation',
    description: 'Portfolio of Igor Henrique de Oliveira Cruz: CRM, automation, websites and applied AI for marketing teams.',
    skip: 'Skip to content',
    nav: { work: 'Work', toolbox: 'Toolbox', contact: 'Contact' },
    langSwitch: { label: 'Language', other: 'pt', otherPath: '/pt/', otherName: 'Português' },
    theme: { label: 'Dark mode' },
    hero: {
      name: 'Igor Cruz',
      line: 'I connect the landing page to the sales team.',
      intro: [
        'I work where marketing meets the plumbing behind it. I build the pages and the forms, make sure every lead reaches the CRM with its source intact, keep the emails out of spam and measure what is really working.',
        'Right now I do this for a US insurance agency that serves Brazilian and Hispanic families. The cases below are real and contain no client data.',
      ],
      ctaEmail: 'Email me',
      ctaCopy: 'Copy address',
      ctaCopied: 'Copied',
      ctaWork: 'See the work',
      facts: 'Based in Jundiaí, Brazil. Fluent in English, native in Portuguese, working Spanish.',
    },
    board: {
      label: 'How a lead travels through the work I do',
      nodes: [
        { name: 'Pages', note: '60+ pages in 3 languages' },
        { name: 'Ads and forms', note: 'Meta, TikTok and site forms' },
        { name: 'CRM', note: 'Routed, deduplicated, alerted' },
        { name: 'Sales team', note: '130k follow-up emails a week' },
      ],
    },
    work: {
      title: 'Selected work',
      lede: 'Nine cases, each one a problem I was handed and what happened after. Press a case to open it.',
      filterLabel: 'Filter the cases',
      showing: (n, total) => `Showing ${n} of ${total}`,
      parts: { problem: 'The problem', did: 'What I did', result: 'What changed' },
      toolsLabel: 'Tools used',
      open: 'Open case',
      close: 'Close case',
      status: { live: 'Live', progress: 'In progress', personal: 'Personal project' },
    },
    filters: [
      ['all', 'All'], ['automation', 'Automation'], ['web', 'Websites'], ['data', 'Data'],
      ['email', 'Email'], ['ai', 'AI'], ['personal', 'Personal'],
    ],
    toolbox: {
      title: 'Toolbox',
      lede: 'What I reach for most days. I pick the tool after I understand the problem, not before.',
      groups: [
        ['Automation and CRM', ['n8n', 'Zapier', 'Zoho CRM', 'Zoho Sign', 'GoHighLevel', 'Google Apps Script']],
        ['Websites', ['WordPress', 'Elementor', 'HTML and CSS', 'JavaScript', 'PHP']],
        ['Ads and data', ['Meta Ads', 'TikTok Ads API', 'Google Tag Manager', 'Zoho Analytics']],
        ['Email', ['Zoho Marketing Automation', 'SPF, DKIM and DMARC', 'List hygiene']],
        ['AI and code', ['Claude and Claude Code', 'MCP connectors', 'Python', 'Node.js', 'Git']],
      ],
    },
    principles: {
      title: 'How I work',
      items: [
        ['Understand the need first', 'I start from what people need and which data is missing. The tool comes after.'],
        ['Don’t break what works', 'Big changes go in next to production, with a backup and a way back.'],
        ['Done means checked', 'Every delivery has concrete completion checks and only counts once it is tested.'],
        ['Client data stays protected', 'No personal data in code or reports, the least access an integration needs, and approval before acting.'],
      ],
    },
    contact: {
      title: 'Hiring for marketing ops, CRM or automation?',
      text: 'Tell me what is breaking or what you need built, and I will tell you how I would approach it.',
      github: 'GitHub profile',
    },
    footer: 'Cases shared without client data. Last updated November 2026.',
  },

  pt: {
    htmlLang: 'pt-BR',
    path: '/pt/',
    title: 'Igor Cruz, operações de marketing e automação',
    description: 'Portfólio de Igor Henrique de Oliveira Cruz: CRM, automação, sites e IA aplicada para times de marketing.',
    skip: 'Pular para o conteúdo',
    nav: { work: 'Trabalhos', toolbox: 'Ferramentas', contact: 'Contato' },
    langSwitch: { label: 'Idioma', other: 'en', otherPath: '/', otherName: 'English' },
    theme: { label: 'Modo escuro' },
    hero: {
      name: 'Igor Cruz',
      line: 'Eu conecto a página de captação ao time de vendas.',
      intro: [
        'Trabalho onde o marketing encontra o encanamento por trás dele. Construo as páginas e os formulários, garanto que cada lead chegue ao CRM com a origem certa, mantenho os e-mails longe do spam e meço o que de fato funciona.',
        'Hoje faço isso numa corretora de seguros nos EUA que atende famílias brasileiras e hispânicas. Os casos abaixo são reais e não têm dados de clientes.',
      ],
      ctaEmail: 'Mandar e-mail',
      ctaCopy: 'Copiar endereço',
      ctaCopied: 'Copiado',
      ctaWork: 'Ver os trabalhos',
      facts: 'Moro em Jundiaí, SP. Inglês fluente, português nativo, espanhol de trabalho.',
    },
    board: {
      label: 'O caminho de um lead pelo trabalho que eu faço',
      nodes: [
        { name: 'Páginas', note: '60+ páginas em 3 idiomas' },
        { name: 'Anúncios e formulários', note: 'Meta, TikTok e formulários do site' },
        { name: 'CRM', note: 'Roteado, sem duplicados, com alerta' },
        { name: 'Time de vendas', note: '130 mil e-mails de acompanhamento por semana' },
      ],
    },
    work: {
      title: 'Trabalhos',
      lede: 'Nove casos, cada um com o problema que recebi e o que aconteceu depois. Aperte um caso para abrir.',
      filterLabel: 'Filtrar os casos',
      showing: (n, total) => `Mostrando ${n} de ${total}`,
      parts: { problem: 'O problema', did: 'O que eu fiz', result: 'O que mudou' },
      toolsLabel: 'Ferramentas usadas',
      open: 'Abrir caso',
      close: 'Fechar caso',
      status: { live: 'No ar', progress: 'Em andamento', personal: 'Projeto pessoal' },
    },
    filters: [
      ['all', 'Todos'], ['automation', 'Automação'], ['web', 'Sites'], ['data', 'Dados'],
      ['email', 'E-mail'], ['ai', 'IA'], ['personal', 'Pessoal'],
    ],
    toolbox: {
      title: 'Ferramentas',
      lede: 'O que eu uso quase todo dia. Escolho a ferramenta depois de entender o problema, não antes.',
      groups: [
        ['Automação e CRM', ['n8n', 'Zapier', 'Zoho CRM', 'Zoho Sign', 'GoHighLevel', 'Google Apps Script']],
        ['Sites', ['WordPress', 'Elementor', 'HTML e CSS', 'JavaScript', 'PHP']],
        ['Anúncios e dados', ['Meta Ads', 'TikTok Ads API', 'Google Tag Manager', 'Zoho Analytics']],
        ['E-mail', ['Zoho Marketing Automation', 'SPF, DKIM e DMARC', 'Higiene de listas']],
        ['IA e código', ['Claude e Claude Code', 'Conectores MCP', 'Python', 'Node.js', 'Git']],
      ],
    },
    principles: {
      title: 'Como eu trabalho',
      items: [
        ['Entender antes de escolher', 'Começo pelo que as pessoas precisam e pelo dado que falta. A ferramenta vem depois.'],
        ['Não quebrar o que funciona', 'Mudança grande entra ao lado da produção, com backup e caminho de volta.'],
        ['Pronto é o que foi checado', 'Toda entrega tem critérios concretos de conclusão e só conta depois de testada.'],
        ['Dado de cliente protegido', 'Nada de dado pessoal em código ou relatório, o mínimo de acesso nas integrações e aprovação antes de agir.'],
      ],
    },
    contact: {
      title: 'Procurando alguém para operações de marketing, CRM ou automação?',
      text: 'Me conte o que está quebrando ou o que precisa ser construído, e eu conto como atacaria o problema.',
      github: 'Perfil no GitHub',
    },
    footer: 'Casos compartilhados sem dados de clientes. Atualizado em novembro de 2026.',
  },
};

/** Returns the cases with the text of one language merged in. */
export function casesFor(lang) {
  return CASES.map(({ en, pt, ...meta }) => ({ ...meta, ...(lang === 'pt' ? pt : en) }));
}
