// Interpolation works as follows:
//
// Make a key with the translation and enclose the variable with {{}}
// ie "Hello {{name}}" Do not add any spaces around the variable name.
// Provide the values as: I18n.t("key", {name: "John Doe"})

import I18n from "i18n-js";

I18n.translations.pt = {
    code: "PT",
    name: "Português",
    select_locale: "Selecionar Português",

    boolean: {
        yes: "Sim",
        no: "Não"
    },

    browser_not_supported: {
        title: "O browser que está a utilizar não é suportado.",
        description_html: "A versão do Internet Explorer que está a utilizar não é suportada. Por favor actualize o seu browser para uma versão mais recente."
    },

    header: {
        title: "Dashboard",
        welcome: "Bem vindo,",
        links: {
            help_html: "<a href=\"https://wiki.surfnet.nl/display/surfconextdev/Beschikbare+diensten+activeren#Beschikbaredienstenactiveren-HandleidingSURFconextDashboard\" target=\"_blank\">Ajuda SURFconext Dashboard</a>",
            logout: "Sair",
            exit: "Sair"
        },
        you: "Voçê",
        profile: "Profile",
        switch_idp: "Escolher outro IDP",
        super_user_switch: "Trocar Identidade"
    },
    confirmation_dialog: {
        title: "Por favor confirme",
        confirm: "Confirmar",
        cancel: "Cancelar",
        leavePage: "Tem a certeza que pretende sair esta página?",
        leavePageSub: "As alterações que realizou não serão gravadas.",
        stay: "Permanecer",
        leave: "Sair"
    },

    navigation: {
        apps: "Serviços",
        policies: "Políticas de Autorização",
        history: "Pedidos de Serviço",
        stats: "Estatisticas",
        my_idp: "A minha instituição",
        invite_request: "Convite"
    },

    loader: {
        loading: "A carregar todos os serviços"
    },

    facets: {
        title: "Filtros",
		refresh: "Atualizar",
        reset: "Limpar",
        download: "Exportar",
        unknown: "Desconhecido",
        totals: {
            all: "A visualizar {{total}} serviços",
            filtered: "A visualizar {{count}} de {{total}} serviços"
        },
        static: {
            connection: {
                all: "Todos",
                has_connection: "Sim",
                name: "Serviço ligado",
                no_connection: "Não",
            },
            license: {
                has_license_sp: "Sim, com o fornecedor de serviço",
                has_license_surfmarket: "Sim, com SURFmarket",
                name: "Licença",
                not_needed: "Não é necessário",
                unknown: "Desconhecido",
            },
            used_by_idp: {
                all: "Todos",
                name: "Fornecidos pela minha instituição",
                no: "Não",
                yes: "Sim",
            },
            published_edugain: {
                all: "Todos",
                name: "Publicados na federação eduGAIN",
                no: "Não",
                yes: "Sim",
            },
            interfed_source: {
				tooltip: "Alguns serviços disponiveis através da SURFconext são fornecidos através de outras federações que não a SURFconext. Aqui pode filtrar por federação.",
                name: "Federação de origem",
                surfconext: "SURFconext",
                edugain: "eduGAIN",
                entree: "Entrada"
            },
            entity_category: {
                name: "eduGAIN Categorias de Entidade",
                tooltip: "SOs serviços podem obedecer a 'categorias de entidade'.<br>Consulte a <a href=\"https://wiki.surfnet.nl/display/surfconextdev/Entity+categories\" target=\"_blank\">wiki</a>para mais informações. Aqui pode filtrar os serviços que aderem a uma determinada categoria.",
                code_of_conduct: "Code of Conduct",
                research_and_scholarship: "Research and Scholarship"
            },
			strong_authentication: {
                name: "Suporta SURFsecureID",
                yes: "Sim",
                no: "Não"
            },
            attribute_manipulation: {
                name: "Script de manipulação de atributos personalizado",
                yes: "Sim",
                no: "Não"
            },
            arp: {
                name: "Libertar atributos",
                info_html: "É possivel que sejam libertados mais atributos para o Serviço através da manipulação de atributos."
            },
            type_consent: {
                tooltip: "Como é solicitada o consentimento aos novos utilizadores antes de aceder ao serviço.<br>Consulte a <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/conextsupport/Het+Consent-scherm\">wiki</a> para mais informações.",
                name: "Tipo de consentimento",
                no_consent: "Sem consentimento",
                minimal_consent: "Consentimento minimo",
                default_consent: "Cosentimento por omissão",
            }
        }
    },

   apps: {
        detail: {
            application_usage: "Utilização do serviço",
            attribute_policy: "Atributos",
            close_screenshot: "Fechar",
            how_to_connect: "Activar serviço",
            how_to_disconnect: "Desativar serviço",
            idp_usage: "Utilizado por",
            license_data: "Licença",
            overview: "Visão geral",
            sirtfi_security: "Sirtfi Security",
            privacy: "Privacidade",
            consent: "Consentimento",
            back: "Voltar",
            outstandingIssue: "Já existe um pedido de serviço excepcional {{jiraKey}} do tipo {{type}} e estado {{status}} para este Serviço.",
            inviteAlreadyProcessed: "O convite para o pedido de serviço {{jiraKey}} já foi {{action}}.",
            outstandingIssueLink: " Aceda à seção <a class=\"link\" href=\"{{link}}\">{{linkName}}</a>  para aprovar / recusar o convite.",
            approved: "aprovado",
            denied: "recusado"
        },
        overview: {
            connect: "",
            connect_button: "Ativar",
            connected: "Ativado",
            license: "Licença protegida",
            licenseStatus: "Licença exigida",
            aansluitovereenkomstRefused: "Política assinada",
            license_present: {
                na: "n/a",
                no: "Não",
                unknown: "Desconhecida",
                yes: "Sim",
            },
            license_unknown: "Desconhecida",
            name: "Serviço",
            no_results: "Não existem serviços disponiveis",
            processing_results: "A disponibilizar todos os serviços...",
            search: "Pesquisar",
            search_hint: "Filtrar por nome",
        },
    },

    app_meta: {
        question: "Tem alguma questão?",
        eula: "Termos & Condições",
        website: "Website",
        support: "Página de suporte",
        login: "Página de entrada",
        registration_info_html: "Este fornecedor de serviço está disponivel na  SURFconext através do <a href=\"https://support.surfconext.nl/edugain\" target=\"_blank\">eduGAIN</a>. O Fornecedor de Serviço é registado através da seguinte federação: <a href=\"{{url}}\" target=\"_blank\">{{url}}</a>.",
        registration_policy: "Política de registo",
        privacy_statement: "Política de Privacidade",
        metadata_link: "Metadata"
    },
    license_info_panel: {
        title: "Informação da Licença",
        has_license_surfmarket_html: "Existe uma licença válida através da <a href=\"https://www.surfmarket.nl\" target=\"_blank\">SURFmarket</a>.",
        has_license_sp_html: "A licença para <a href=\"{{serviceUrl}}\" target=\"_blank\">{{serviceName}}</a> pode ser adquirida ao fornecedor deste serviço.",
        has_license_sp_html_no_service_url: "A licença para {{serviceName}} pode ser adquirida ao fornecedor deste serviço.",
        no_license_html: "A sua instituição não tem uma licença válida disponivel através da <a href=\"https://www.surfmarket.nl\" target=\"_blank\">SURFmarket</a>.",
        not_needed_html: "Este Serviço não requer licença.",
        unknown_license: "É desconhecido se é necessário licença.",
        no_license_description_html: "" +
            "<ul>" +
            "   <li>A sua instituição pode obter uma linceça a partir da <a href=\"https://www.surfmarket.nl\" target=\"_blank\">SURFmarket</a>.</li>" +
            "</ul>" +
            "<br />Em alguns casos a licença necessita de ser obtida directamente do fornecedor de serviço.",
        unknown_license_description_html: "Podem existir várias razões:" +
            "<ul>" +
            "   <li>A SURFnet ou outra instituição está a diponibilizar o serviço de forma gratuita.</li>" +
            "   <li>A licença necessita de ser obtida directamente do fornecedor de serviço.</li>" +
            "   <li>A licença não foi adicionada à administração da <a href=\"https://www.surfmarket.nl\" target=\"_blank\">SURFmarket</a>.</li>" +
            "</ul>" +
            "<p>Se necessário, a SURFnet pode contactar o fornecedor de serviço ou a <a href=\"https://www.surfmarket.nl\" target=\"_blank\">SURFmarket</a> antes de ativar a ligação.</p>"
    },

  license_info: {
        unknown_license: "Nenhuma informação de licença disponível",
        has_license_surfmarket: "Licença disponível através da SURFmarket",
        has_license_sp: "Licença necessaria (através do fornecedor de serviço)",
        no_license: "Nenhuma licença disponível",
        no_license_needed: "Não é necessário licença",
        license_info: "Saiba como obter a licença",
        license_unknown_info: "Ler mais",
        valid: "Licença válida até {{date}}"
    },

  overview_panel: {
        wiki_info_html: "Informações extras estão disponíveis para este serviço na SURFconext <a href=\"{{link}}\" target=\"_blank\">wiki</a>.",
        no_description: "A descrição deste serviço não está disponível.",
        description: "Descrição",
        has_connection: "Ligações ativas",
        no_connection: "Ligações inativas",
        how_to_connect: "Saiba como ativar",
        disconnect: "Saiba como desativar a ligação",
        normen_kader: "Informação sobre o AVG/GDPR",
        normen_kader_html: "Para este serviço, foi publicada informação sobre quais os dados processados e onde processam esses dados. Pode encontrar esta informação na <a href=\"https://wiki.surfnet.nl/pages/viewpage.action?pageId=60689334\" target=\"_blank\">wiki</a>. Durante 2018 esta informação será incorporada na nova versão do Dashboard.",
        no_normen_kader_html: "Para este serviço, ainda não foi disponibilizada informação sobre o AVG/GDPR; informação sobre quais os dados que processam e onde podem ser solicitados ao fornecedor do serviço.",
        single_tenant_service: "Serviço single tenant",
        single_tenant_service_html: "{{name}} é um serviço single tenant,como tal, requer uma instância separada para cada instituição que deseja ligar-se a este serviço. Para obter mais informações sobre serviços single tenant, consulte <a href=\"https://wiki.surfnet.nl/display/services/(Cloud)services\" target=\"_blank\">SURFnet wiki</a>",
        interfed_source: "Origem da federação:",
        publish_in_edugain_date: "Publicado no eduGAIN em:",
        supports_ssa: "Suporta SURFsecureID",
        entity_categories: "Suporta Entity Categories",
        entity_category: {
            "http://wwwgeantnet/uri/dataprotection-code-of-conduct/v1": "GÉANT Data Protection Code of Conduct",
            "http://refedsorg/category/research-and-scholarship": "Research and Scholarship"
        },
        aansluitovereenkomst: "Protocolo de Adesão",
        aansluitovereenkomstRefused: "Este serviço recusou-se a assinar 'Protocolo de adesão à SURFconext' com a SURF. Read more about this policy on the <a href=\"https://wiki.surfnet.nl/display/surfconextdev/Afspraken+-+contracten+-+trustframework\" target=\"_blank\">SURF wiki</a>.",
        privacyInformation: "Informação de privacidade",
        privacyInformationInfo: "O serviço não disponibilizou informação de privacidade."
    },

	attributes_policy_panel: {
        arp: {
            noarp: "Não existe uma 'Attribute Release Policy' específica. Todos os atributos são enviados.",
            noattr: "Não são enviados atributos para {{name}}.",
            manipulation: "Para este serviço existe efetivamente um 'script de manipulação de atributos'. A SURFconext executa o script para cada utilizador autenticado, antes de enviar os atributos para o serviço. Para que possa compreender qual a informação a ser enviada, por favor consulte abaixo uma descrição sobre o tratamento realizado pelo script:",
        },
        attribute: "Atributo",
        hint: "Os atributos e os respetivos valores para a sua conta pessoal são apresentados.Isto pode não ser representativo para outras contas na sua organização.",
        subtitle: "{{name}} quer receber os seguintes atributos",
        title: "Atributos",
        your_value: "O seu valor",
        filter: "Para este atributo os seguintes filtros foram aplicados:",
        motivationInfo: "A coluna ‘motivação‘ contém, na medida do possível, a explicação do fornecedor a razão pela qual precisa deste atributo.",
        motivation: "Motivação",
        no_attribute_value: "<não foi recebido nenhum valor>",
        filterInfo: "Para minimizar os dados a transmitir da insituição para o serviço, a SURFconext por vezes filtra os valores dos atributos.",
        warning: "Observações:"
    },
	idp_usage_panel: {
        title: "Usado por",
        subtitle: "As seguintes instituições estão ligadas a {{name}}.",
        subtitle_none: "Não existem instituições ligadas a {{name}}.",
        subtitle_single_tenant: "Quando pretende saber quais as instituições a usar {{name}} através da SURFconext, por favor envie um email para support@surfconext.nl.",
		institution: "Instituição"
    },
    sirtfi_panel: {
        title: "O contacto Sirtfi para {{name}}",
        subtitle: "A Framework de Resposta a Incidentes de Segurança para Identidades Federadas <a href=\" https://refeds.org/sirtfi\" target=\"_blank\">(Sirtfi) </a> tem como objectivo permitir a coordenação da resposta a incidentes entre organizações federadas. Esta framework de confiança inclui uma lista de asserções que uma organização pode atestar para que possa declarar estar em conformidade com Sirtfi.",
        contactPersons: "O contacto Sirtfi para este serviço:",
        cp_name: "Nome",
        cp_email: "Email",
        cp_telephoneNumber: "Número de telefone",
        cp_type: "Tipo",
        cp_type_translate_technical: "Técnico",
        cp_type_translate_administrative: "Administrativo",
        cp_type_translate_help: "Suporte",
        cp_type_translate_support: "Suporte"
    },
  privacy_panel: {
        title: "Informação de Privacidade",
        subtitle: "A SURF fornece aos novos Serviços a oportunidade de partilhar informação sobre as suas politícas de RGPD. Se disponível, encontra-se abaixo. Para qualquer informação em falta, por favor contacte o fornecedor.",
        subtitle2: "O fornecedor do serviço {{name}} forneceu a seguinte informação (caso existam):",
        question: "Questão",
        answer: "Resposta",
        accessData: "QUEM PODE TER ACESSO AOS DADOS?",
        certification: "PODE O FORNECEDOR DISPONIBILIZAR UM MEMORANDO A TERCEIROS?",
        certificationLocation: "ONDE PODE UMA INSTITUIÇÃO ENCONTRAR/SOLICITAR O MESMO?",
        country: "EM QUE PAÍS ESTÃO OS DADOS ARMAZENADOS?",
        otherInfo: "OUTRAS INFORMAÇÕES DE PRIVACIDADE E SEGURANÇA DE DADOS",
        privacyPolicy: "O FORNECEDOR PUBLICA UMA POLÍTICA DE PRIVACIDADE?",
        privacyPolicyUrl: "QUAL O URL DA POLÍTICA DE PRIVACIDADE?",
        securityMeasures: "QUAIS MEDIDAS DE SEGURANÇA ADOTADAS PELO FORNECEDOR?",
        snDpaWhyNot: "SE NÃO, QUAIS OS ARTIGOS QUE TEM PROBLEMAS & PORQUÊ?",
        surfmarketDpaAgreement: "O FORNECEDOR CONCORDA COM A DPA DA SURFMARKET?",
        surfnetDpaAgreement: "O FORNECEDOR PRETENDE ASSINAR O SURF MODEL DPA?",
        whatData: "QUE(TIPO)DADOS SÃO PROCESSADOS?",
        certificationValidFrom: "CERTIFICAÇÃO VÁLIDA DE",
        certificationValidTo: "CERTIFICAÇÃO VÁLIDA PARA",
        noInformation: "Não foi fornecida informação pelo fornecedor"
    },
    consent_panel: {
        title: "Consentimento de novos utilizadores",
        subtitle: "Aos novos utilizadores será pedido permissão para enviar informação de dados pessoais para este serviço.",
        subtitle2: "Nesta página pode configurar a forma como será pedido o consentimento aos utilizadores antes de ser enviado para {{name}}. Pode configurar para ignorar o consentimento, pedir consentimento minimo e adicionar uma mensagem de consentimento personalizada para os utilizadores deste serviço. As diferentes configurações de consentimento são explicadas <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/conextsupport/Het+Consent-scherm\">nesta página da wiki</a>.",
        subtitle2Viewer: "Nesta página pode visualizar de que forma é pedido o consentimento aos utilizadores antes de ser enviado para {{name}}. As diferentes configurações de consentimento são explicadas <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/conextsupport/Het+Consent-scherm\">nesta página da wiki</a>.",
        no_consent: "Não é necessário consentimento",
        minimal_consent: "É necessário consentimento mínimo",
        default_consent: "Consentimento por omissão com uma mensagem personalizada opcional",
        consent_value: "Tipo de consentimento necessário",
        consent_value_tooltip: "O tipo de consentimento determina como e se é pedido consentimento ao utilizador.",
        explanationNl: "Mensagem em Dutch",
        explanationNl_tooltip: "Esta mensagem será adicionada ao interface de consentimento em Dutch para novos utilizadores.",
        explanationEn: "Mensagem em Inglês",
        explanationEn_tooltip: "Esta mensagem será adicionada ao interface de consentimento em Inglês para novos utilizadores.",
        save: "Guardar alterações",
        change_request_created: "Pedido de Alteração enviado para SURFnet SURFconext-team.",
        no_change_request_created: "Não foi criado o pedido de alteração, já que não foi alterada qualquer informação.",
        change_request_failed: "Falha ao criar o pedido de alteração.",
    },
    how_to_connect_panel: {
        accept: "Certifico que li os termos e condiçoes e que aceito os mesmos em nome da minha instituição.",
        accept_disconnect: "Sim, concordo que {{app}} deixará de estar disponivel para minha organização",
        attributes: "atributos",
        attributes_policy: "política de atributos",
        privacy_policy: "política de privacidade",
        back_to_apps: "Voltar a todos os serviços",
        cancel: "Cancelar",
        check: "Verificar que",
        checklist: "Finalize a lista de verificações antes de activar a ligação:",
        processing_agreements: "Verifique se a sua instituição necessita de um <a href=\"https://wiki.surfnet.nl/display/surfconextdev/Data+processing+agreement\" target=\"_blank\">contrato de adesão</a> para este serviço, se sim, se o mesmo já está assinado.",
        comments_description: "Comentários serão enviados à SURFconext.",
        comments_placeholder: "Adicione aqui os seus comentários...",
        comments_title: "Comentários adicionais?",
        connect: "Ativar serviço",
        connect_title: "Ligar {{app}}",
        connect_invite_title: "Aceitar convite para ligar {{app}}",
        disconnect: "Desativar serviço",
        disconnect_title: "Desativar ligação com {{app}}",
        done_disconnect_subtitle_html: "Será contactado sobre os próximos passos, necessários para finalizar esta desativação. Se tem outras questões antes de proceder à finalização, por favor contacte <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>.",
        done_disconnect_subtitle_html_with_jira_html: "Será contactado sobre os próximos passos, necessários para finalizar esta desativação. Se tem outras questões antes de proceder à finalização, por favor contacte <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a> e adicione o seguinte número do pedido de serviço no assunto da mensagem: {{jiraKey}}.",
        done_disconnect_title: "Pedido de Desativação!",
        done_subtitle_html: "Será contactado sobre os próximos passos, necessários para finalizar esta ativação. Se tem outras questões antes de proceder à finalização, por favor contacte <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>.",
        done_subtitle_with_jira_html: "Será contactado sobre os próximos passos, necessários para finalizar esta ativação. Se tem outras questões antes de proceder à finalização, por favor contacte <a href=\"mailto:support@surfconext.nl?subject=Question about connection {{jiraKey}}\">support@surfconext.nl</a> e adicione o seguinte número do pedido de serviço no assunto da mensagem: {{jiraKey}}.",
        done_title: "Ligação realizada!",
        forward_permission: {
            after: " para {{app}}.",
            before: "SURFnet tem permissões para encaminhar ",
        },
        info_sub_title: "Pode ativar uma ligação neste dashboard. Recomendamos que verifique a lista de verificações e analise a informação específica desta app antes de a ativar.",
        info_sub_invite_title: "Pode aceitar o convite para ativar uma ligação. Recomendamos que verifique a lista de verificações e analise a informação específica desta app antes de a ativar.",
        info_title: "Ativar ligação",
        jira_unreachable: "Algo falhou com o seu pedido",
        jira_unreachable_description: "Não é possivel realizar um pedido neste momento.Por favor tente novamente mais tarde.",
        license: "licença",
        license_info: "informação de licença",
        obtain_license: {
            after: " para usar {{app}}.",
            before: "É da responsabilidade da minha instituição obter um ",
        },
        provide_attributes: {
            after: ".",
            before: "É da responsabilidade da minha instituição fornecer as informações corretas ",
        },
        read: "Ler o",
        single_tenant_service_warning: "Pedidos para ativar serviços "single tenant" podem levar mais tempo a ser processados. SURFnet entrará em contato para discutir o processo de ativação após receber sua solicitação.",
        terms_title: "Ao solicitar uma ativação está a aceitar os termos e condições",
        wiki: "wiki para este serviço",
        aansluitovereenkomst_accept: "Certifico que concordo com a conexão a um serviço que não tenha assinado o 'SURFconext aansluitovereenkomst'.",
        not_published_in_edugain_idp: "serviço eduGAIN",
        not_published_in_edugain_idp_info: "O serviço {{name}} não pode ser ligado porque a sua instituição não está no eduGAIN. Para aderir ao eduGAIN, por favor seleccione a opção 'Publicar no eduGAIN' na tab 'A minha Instituição' e faça um pedido de alteração.",
        edit_my_idp_link: "Criar solicitação de mudança em 'A minha instituição'",
        disconnect_jira_info: "Se pretende receber mais informações sobre o progresso deste pedido, por favor contacte <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a> e adicione o número do pedido de serviço no assunto: CXT-22835",
        invite_denied: "Pedido de Serviço {{jiraKey}} fechado com sucesso.",
        invite_accepted: "Pedido de Serviço {{jiraKey}} foi atualizado com sucesso e com a sua aprovação.",
        deny: "Recusar o convite",
        approve: "Aprovar o convite",
        deny_invitation: "Tem certeza que não pretende aceitar o convite para se ligar {{app}}",
        deny_invitation_info: "Depois de recusar o convite de ligação, pode sempre voltar a realizar um pedido para ativar o serviço aqui no dashboard.",
        invite_action_collision_title: "O serviço {{app}} já está ligado.",
        invite_action_collision_subtitle: "Mid-air colisão detectada.",
        invite_action_collision: "O convite {{app}} já foi aceite. Talvez alguem já tenha aceite o convite? Se tem alguma questão por favor contacte <a href=\"mailto:support@surfconext.nl?subject={{jiraKey}}\">support@surfconext.nl</a> e adicione o número do pedido no assunto do email: {{jiraKey}}."
    },

    application_usage_panel: {
        title: "Utilização do serviço",
        download: "Exportar",
        error_html: "As estatísticas estão indisponíveis de momento. <a href=\"mailto:support@surfconext.nl\">Contacte o suporte</a> para mais informações."
    },

    contact: {
        email: "E-mail de suporte do serviço"
    },
    export: {
        downloadCSV: "Download como CSV",
        downloadPNG: "Download como PNG",
        downloadPDF: "Download como PDF"
    },
    search_user: {
        switch_identity: "Trocar Identidade",
        search: "Pesquisar",
        search_hint: "Filtrar por nome",
        name: "Nome",
        switch_to: "Trocar para o perfil",
        switch: {
            role_dashboard_viewer: "Viewer",
            role_dashboard_admin: "Admin"
        }
    },

    not_found: {
        title: "A página solicitada não foi encontrada.",
        description_html: "Por favor verifique o URL ou aceda à <a href=\"/\">página principal</a>."
    },

    server_error: {
        title: "Não tem permissões suficientes para aceder ao Dashboard.",
        description_html: "Por favor contacte <a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a> ."
    },

    logout: {
        title: "Logout concluído com sucesso.",
        description_html: "<strong>TEM</strong> de fechar o browser para terminar o processo de logout."
    },

    footer: {
        surfnet_html: "<a href=\"https://www.surfnet.nl/en\" target=\"_blank\">SURFnet</a>",
        terms_html: "<a href=\"https://wiki.surfnet.nl/display/conextsupport/Terms+of+Service+%28EN%29\" target=\"_blank\">Termos do Serviço</a>",
        contact_html: "<a href=\"mailto:support@surfconext.nl\">support@surfconext.nl</a>"
    },

    my_idp: {
        title: "A minha instituição",
        roles: "Perfis",
        sub_title_html: "Os seguintes perfis foram atribuídos  (<a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/surfconextdev/Beschikbare+diensten+activeren#Beschikbaredienstenactiveren-HoekunjeopSURFconextaangeslotendienstenactiveren?\">mais info</a>):",
        role: "Perfil",
        users: "Utilizador(es)",
        settings: "Configurações para a minha instituição",
        settings_edit: "Configurações para a minha instituição e serviços",
        settings_text: "Esta secção contém várias configurações da sua instituição e de Fornecedores de Serviço(s) fornecidos à SURFconext através da sua instituição.Estas configurações são utilizadas na SURFconext, por exemplo na página Where Are You From. Se pretende alterar informação, clique em 'Criar pedido de alteração'.",
        settings_text_viewer: "Esta secção contém várias configurações da sua instituição e de Fornecedores de Serviço(s) fornecidos à SURFconext através da sua instituição.Estas configurações são utilizadas na SURFconext, por exemplo na página Where Are You From.",
        SURFconextverantwoordelijke: "SURFconext owner",
        SURFconextbeheerder: "SURFconext maintainer",
        "Dashboard supergebruiker": "Dashboard Super User",
        services_title: "Serviços fornecidos pela sua instituição:",
        services_title_none: "Nenhum",
        service_name: "Nome do Serviço",
        license_contact_html: "Contacto Primário da Licença (<a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/surfconextdev/Beschikbare+diensten+activeren#Beschikbaredienstenactiveren-HoekunjeopSURFconextaangeslotendienstenactiveren?\">mais info</a>):",
        license_contact_name: "Nome",
        license_contact_email: "Email",
        license_contact_phone: "Número de Telefone",
        institution: "Instituição",
        services: "Serviços",
        edit: "Criar pedido de alteração",
        entity_id: "Entity ID",
        state: "Estado",
        prodaccepted: "Produção",
        testaccepted: "Testes",
        all: "Todos",
        name: {
            en: "Nome (en)",
            nl: "Nome (nl)"
        },
        displayName: {
            en: "Display name (en)",
            nl: "Display name (nl)"
        },
        organizationURL: {
            en: "URL da Organização (en)",
            nl: "URL da Organização (nl)"
		},
		organizationURL_nl_tooltip: "Um URL que o utilizador pode aceder para obter informação em Dutch sobre a organização.",
        organizationURL_en_tooltip: "Um URL que o utilizador pode aceder para obter informação em Inglês sobre a organização.",
        organizationName: {
            en: "Nome da Organização (en)",
            nl: "Nome da Organização (nl)"
        },
        organizationName_nl_tooltip: "O nome oficial em Dutch da organização.",
        organizationName_en_tooltip: "O nome oficial em Inglês da organização.",
        organizationDisplayName: {
            en: "Nome de Apresentação da Organização(en)",
            nl: "Nome de Apresentação da Organização(nl)"

        },
        organizationURL_nl_tooltip: "URL onde o utilizador final pode aceder para obter mais informações sobre a organização em Dutch.",
        organizationURL_en_tooltip: "URL onde o utilizador final pode aceder para obter mais informações sobre a organização em Inglês.",
        keywords: {
            en: "Keywords (en)",
            nl: "Keywords (nl)"
        },
        published_in_edugain: "Publicado no eduGAIN",
        date_published_in_edugain: "Data de publicação no eduGAIN",
        logo_url: "Logo",
        new_logo_url: "URL do Novo logo ",
        research_and_scholarship_info: "Ligar-se automáticamente aos SP's compatíveis com a categoria CoCo R&S",
        research_and_scholarship_tooltip: "Isto significa que o vosso IdP ativa automáticamente ligações para todos os SPs na <br>SURFconext que aderiram à categoria ‘Research & Scholarship Entity Category’<br> e ‘GEANT Data Protection Code of Conduct’, libertanto os atributos R&S. <br>Consulte<a href=\"https://wiki.surfnet.nl/pages/viewpage.action?pageId=86769882\" target=\"_blank\">wiki</a> para mais informações.",
        contact: "Contacto para {{name}}",
        contact_name: "Nome do contacto",
        contact_email: "Email do contacto",
        contact_type: "Tipo de contacto",
        contact_telephone: "Telefone do contacto",
        contact_types: {
            technical: "Tecnico",
            support: "Suporte",
            help: "Suporte",
            administrative: "Administrativo"
        },
        description: {
            en: "Descrição (en)",
            nl: "Descrição (nl)"
        },
        guest_enabled: "Acesso a convidados ativo",
        edit_message: "Voçê pode editar os seguintes campos.",
        save: "Criar pedido de alteração",
        change_request_created: "Pedido de alteração enviado para a SURFnet SURFconext-team.",
        no_change_request_created: "Não foi criado pedido de alteração já que não existem alterações.",
        change_request_failed: "Falha ao criar o seu pedido de alteração.",
        comments: "Comentários"
    },

    policies: {
        confirmation: "Tem a certeza que pretende remover a politíca '{{policyName}}?'",
        flash: "Política de autorização '{{policyName}}' foi {{action}} com sucesso",
        flash_created: "criada",
        flash_deleted: "removida",
        flash_first: "Esta é a primeira política de autorização para este serviço. Antes de ficar ativo, a equipa SURFconext tem de realizar alterações de configuração manualmente. Foi enviada uma notificação paa a equipa SURFconext. Em breve será contactado.",
        flash_updated: "atualizado",
        new_policy: "Nova política de autorização",
        how_to: "How-to",
        policy_name_not_unique_exception: "Este nome de política já está a ser utilizado",
        pdp_unreachable: "PDP inacessível",
        pdp_unreachable_description: "De momento não é possível obter as políticas do PDP. Por favor, tente novamente mais tarde.",
        overview: {
            active: "Ativo",
            description: "Descrição",
            identityProviderNames: "Instituições",
            name: "Nome",
            numberOfRevisions: "Revisões",
            search: "Pesquisar",
            search_hint: "Filtrar por nome",
            serviceProviderName: "Serviço",
        },
    },

    policy_attributes: {
        attribute: "Atributo",
        attribute_value_placeholder: "Valor do atributo...",
        group_info: " O valor(es) deve ser um ID de grupo totalmente qualificado ex. 'urn:collab:group:surfteams.nl:nl:surfnet:diensten:admins'",
        new_attribute: "Adicionar novo atributo....",
        new_value: "Adicionar novo valor...",
        sab_info: " O(s) valor(es) tem de corresponder a perfis válidos no SAB ex. 'Instellingsbevoegde'",
        values: "Valor(es)",
        help_link: "https://wiki.surfnet.nl/display/surfconextdev/Attributes+in+SURFconext"
    },

    policy_detail: {
        access: "Acesso",
        attribute: "Atributos",
        autoFormat: "Formatação automática da descrição da política",
        cancel: "Cancelar",
        confirmation: "Tem a certeza que pretende sair desta página?",
        create_policy: "Criar nova política de autorização",
        deny: "Não Autorizar",
        deny_info: "Políticas para não autorizar são menos comuns de utilizar. Se os atributos na politíca corresponderem aos do utilizador que está a realizar um login, então o resultado será não autorizar o acesso. Nenhuma correspondência resulta em autorizar. ",
        deny_message: "Não Autorizar - Mensagem em Inglês",
        deny_message_info: "Esta é a mensagem disponibilizada ao utilizador se o acesso não for autorizado com base nesta política.",
        deny_message_nl: "Não Autorizar - Mensagem em Dutch",
        description: "Descrição",
        idps_placeholder: "Selecione os Fornecedores de Identidade - zero ou mais",
        institutions: "Instituições",
        isActive: "Ativo",
        isActiveDescription: "Marcar a política de autorização como ativa",
        isActiveInfo: " Políticas de autorização inativas não são avaliadas nas decisões",
        name: "Nome",
        permit: "Autorizar",
        permit_info: "Políticas para autorizar garantem que apenas uma correspondencia bem sucedida dos atributos definidos resultará em autorizar o acesso. Nenhuma correspondência resulta em não autorizar.",
        rule: "Regra",
        rule_and: "AND",
        rule_and_info: "Políticas com regras AND garantem que todos os atributos definidos tem de corresponder aos da pessoa que está a tentar fazer login.",
        rule_info_add: " Note que ao definir vários valores de atributo para um mesmo nome de atributo, estes serão sempre avaliados com lógica OR.",
        rule_info_add_2: "Note que uma política de Não Autorizar acesso utiliza sempre e implicitamente a lógica AND para diferenres nomes de atributos.",
        rule_or: "OR",
        rule_or_info: "Políticas definidas com lógica OR apenas obriga a que um dos atributos do utilizador que está a pedir o acesso faça correspondencia.",
        service: "Serviço",
        spScopeInfo: "Os Serviços disponíveis são limitados aos seus serviços se não selecionar uma Instituição",
        sp_placeholder: "Selecione o Fornecedor de Serviço - obrigatório",
        sub_title: "Criado por {{displayName}} em {{created}}",
        submit: "Submeter",
        update_policy: "Atualizar política de autorização",
    },

    revisions: {
        active: "Ativo",
        allAttributesMustMatch: "Regra de lógica OR?",
        attributes: "Atributos",
        changes_first_html: "Este é a primeira <span class=\"curr\">revisão inicial {{currRevisionNbr}}</span> criada por {{userDisplayName}} de {{authenticatingAuthorityName}} em {{createdDate}}.",
        changes_info_html: "Alterações realizadas entre <span class=\"prev\"> revisão número {{prevRevisionNbr}}</span> e <span class=\"curr\">revisão número {{currRevisionNbr}}</span> realizada por {{userDisplayName}} de {{authenticatingAuthorityName}} em {{createdDate}}.",
        denyAdvice: "Não Autorizar - Mensagem em Inglês",
        denyAdviceNl: "Não Autorizar - Mensagem em Dutch",
        denyRule: "Regra para Autorizar Acesso?",
        description: "Descrição",
        identityProviderNames: "Instituições",
        name: "Nome",
        revision: "Número da Revisão",
        serviceProviderName: "Serviço",
        title: "Revisões",
    },

    history: {
        info: "Nesta página pode encontrar todos os pedidos de serviços relacionados com a (des)ativação de serviços e pedidos de alterações.À esquerda pode editar o filtro aplicado a esta lista.",
        requestDate: "Criado",
        updateDate: "Atualizado",
        type: "Tipo",
        jiraKey: "Id",
        status: "Estado",
        userName: "Por",
        spName: "Serviço",
        action_types_name: {
            LINKREQUEST: "Nova Ligação",
            UNLINKREQUEST: "Desativar",
            QUESTION: "Questão",
            CHANGE: "Pedido de alteração",
            LINKINVITE: "Convite para ativar"
        },
        from: "De",
        to: "Para",
        typeIssue: "Tipe",
        spEntityId: "Serviço",
        statuses: {
            "To Do": "Abrir",
            "In Progress": "Em progresso",
            "Awaiting Input": "Input pendente",
            "Resolved": "Resolvido",
            "Closed": "Fechado"
        },
        resolution: {
            no_change_required: "Não foram necessárias alterações",
            no_change_requiredTooltip: "O pedido não necessitou de alteração.",
            incomplete: "Incompleto",
            incompleteTooltip: "O pedido está incompleto.",
            done: "Efetuado",
            doneTooltip: "O pedido está resolvido.",
            wont_do: "Não será resolvido",
            wont_doTooltip: "O pedido não será resolvido.",
            cancelled: "Cancelado",
            cancelledTooltip: "O pedido foi cancelado.Se o pedido foi um convite para ligar um serviço, a Instituição não aceitou o convite.",
            wont_fix: "Não será resolvido",
            wont_fixTooltip: "O pedido não será resolvido.",
            resolved: "Resolvido",
            resolvedTooltip: "O pedido foi resolvido com sucesso.",
            duplicate: "Duplicado",
            duplicateTooltip: "O pedido era um duplicado de outro seviço.",
            not_completed: "Incompleto",
            not_completedTooltip: "O pedido está incompleto.",
            cannot_reproduce: "Não foi possível reproduzir",
            cannot_reproduceTooltip: "A situação descrita no pedido não foi possivel reproduzir",
            suspended: "Suspenso",
            suspendedTooltip: "O pedido foi suspenso."
        },
        servicePlaceHolder: "Pesquisa e selecione um serviço...",
        noTicketsFound: "Não foram encontrados pedidos para o filtro fornecido.",
        viewInvitation: "Aprovar / Recusar"
    },

    stats: {
        filters: {
            name: "Filtros",
            allServiceProviders: "Todos os Serviços"
        },
        state: "Estado",
        timeScale: "Período",
        date: "Data",
        from: "De",
        to: "Até e incluindo",
        today: "Hoje",
        sp: "Serviço",
        period: {
            year: "Ano"
        },
        displayDetailPerSP: "Visualizar detalhes por Serviço",
        scale: {
            year: "Ano",
            quarter: "Trimestre",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            hour: "Hora",
            minute: "Minutos",
            all: "Período completo: de -> até"
        },
        helpLink: "https://wiki.surfnet.nl/display/surfconextdev/Beschikbare+diensten+activeren#Beschikbaredienstenactiveren-Statistieken"
    },
    chart: {
        title: "Logins e utilizadores por dia",
        chart: "Número de logins por {{scale}}",
        chartAll: "Número de logins",
        userCount: "Número total de logins",
        uniqueUserCount: "Utilizadores únicos",
        loading: "A processar logins....",
        noResults: "Não foram realizados logins para o período definido.",
        date: "Data",
        logins: "Logins por {{scale}}",
        allLogins: "# Logins",
        uniqueLogins: "Logins Únicos",
        sp: "Serviço",
        idp: "Instituição"
    },
    clipboard: {
        copied: "Copiado!",
        copy: "Copiar para o clipboard"
    },
    live: {
        chartTitle: "Logins por {{scale}}",
        aggregatedChartTitlePeriod: "Logins durante {{period}} por {{group}}",
        noTimeFrameChart: "Logins de {{from}} até {{to}}"
    },
    service_filter: {
        title: "Filtrar serviços",
        state: {
            tooltip: "O estado do Service determina se o Serviço está visivel na platforma de produção."
        },
        search: "Pesquisar serviços..."
    },
    invite_request: {
        info: 'Um pedido de convite resulta num email enviado para todos os contactos da instituição com um convite para o serviço selecionado. Um pedido de serviço para <span class="emphasize">Convite de Ligação</span> é criado com o estado <span class="emphasize">À Espera de Entrada</span>.',
        selectIdp: "Pesquisa e selecione uma Instituição...",
        selectSpDisabled: "Primeiro selecione uma Instituição",
        selectSp: "Agora pesquisar e selecione um Serviço...",
        idp: "Instituição",
        sp: "Serviço",
        contactPersons: "Selecione os contactos de {{name}} para os quais pretende enviar o convite.",
        sourcePersons: "Contactos de {{source}}",
        additionalPersons: "Contactos adicionais",
        selectContact: "Selecione",
        sendRequest: "Submeter",
        reset: "Reset",
        message: "Uma mensagem - opcional - para os destinatários do convite.",
        jiraFlash: "Foi criado um pedido de serviço com a chave {{jiraKey}}.Quando um dos destinatários aceitar o convite, o mesmo será registado nos comentários de  {{jiraKey}}."
    },
    profile: {
        title: "Perfil",
        sub_title: "Os seguintes dados de perfil foram fornecidos pela sua instituição. Esta informação assim como os grupos a que pertence (ex.:SURFteams) serão registados na SURFconext e partilhados com os serviços utilizados através da SURFconext.",
        my_attributes: "Os meus atributos",
        attribute: "Atributos",
        value: "Valores",
        my_roles: "Os meus perfis",
        my_roles_description: "Os seguintes perfis foram atibuídos:",
        role: "Perfil",
        role_description: "Descrição",
        roles: {
            ROLE_DASHBOARD_ADMIN: {
                name: "SURFconext Administrador",
                description: "Está autorizado pela sua instituição a realizar a gestão de ligações a serviços"
            },
            ROLE_DASHBOARD_VIEWER: {
                name: "SURFconext Suporte",
                description: "Está autorizado pela sua instituição a visualizar a informação sobre serviços"
            },
            ROLE_DASHBOARD_SUPER_USER: {
                name: "Dashboard Super User",
                description: "Tem permissões de superuser no dashboard"
            }
        },
        attribute_map: {
            "uid": {
                name: "UID",
                description: "o seu username único dentro da sua organização"
            },
            "Shib-surName": {
                name: "Sobrenome",
                description: "o seu sobrenome"
            },
            "Shib-givenName": {
                name: "Nome",
                description: "o seu nome"
            },
            "Shib-commonName": {
                name: "Nome Completo",
                description: "o seu nome completo"
            },
            "displayName": {
                name: "Nome a Apresentar",
                description: "nome a apresentar nas aplicações"
            },
            "Shib-InetOrgPerson-mail": {
                name: "Endereço de E-mail ",
                description: "o seu endereço de e-mail conhecido na sua instituição"
            },
            "Shib-eduPersonAffiliation": {
                name: "Afiliação",
                description: "a(s) sua afiliação(s) com a organização"
            },
            "Shib-eduPersonScopedAffiliation": {
                name: "Scoped relation",
                description: "a(s) sua afiliação(s) com a organização concatenado com o @dominio da organização"
            },
            "eduPersonEntitlement": {
                name: "Entitlement",
                description: "define um direito, utilizado pelas aplicações no processo de autorização"
            },
            "Shib-eduPersonPN": {
                name: "Net-ID",
                description: "o seu username único dentro da sua instituição concatenado com o @dominio da organização"
            },
            "Shib-preferredLanguage": {
                name: "Idioma Preferencial",
                description: "uma abreviação de duas letras de acordo com o ISO 639; em subcódigos"
            },
            "schacHomeOrganization": {
                name: "Organização",
                description: "nome da organização, que faz uso do dominío em conformidade com o RFC 1035"
            },
            "Shib-schacHomeOrganizationType": {
                name: "Tipo de Organização",
                description: "tipo de organização a que o utilizador pertence"
            },
            "Shib-schacPersonalUniqueCode": {
                name: "Código único pessoal",
                description: "estes valores são usados para expressar tipos específicos de números de identificação"
            },
            "Shib-nlEduPersonHomeOrganization": {
                name: "Nome de apresentação da Organização",
                description: "nome de apresentação da organização"
            },
            "Shib-nlEduPersonOrgUnit": {
                name: "Nome da Unidade Orgânica",
                description: "nome da unidade orgânica"
            },
            "Shib-nlEduPersonStudyBranch": {
                name: "Área de Estudo",
                description: "área de estudo;string númerica que contém o código CROHOcode. pode estar vazio se a área for desconhecida"
            },
            "Shib-nlStudielinkNummer": {
                name: "Studielinknummer",
                description: "studielinknummer do estudante registado em www.studielink.nl"
            },
            "Shib-nlDigitalAuthorIdentifier": {
                name: "DAI",
                description: "Digital Author Identifier (DAI)"
            },
            "Shib-userStatus": {
                name: "Estado do Utilizador",
                description: "Estado do utilizador na SURFconext"
            },
            "Shib-accountstatus": {
                name: "Estado da Conta",
                description: "Estado da conta na SURFconext"
            },
            "name-id": {
                name: "Identificador",
                description: "Identificador da conta na SURFconext"
            },
            "Shib-voName": {
                name: "Nome da Organização Virtual",
                description: "O nome da Organização Virtual para a qual autenticou"
            },
            "Shib-user": {
                name: "Identificador",
                description: "Identificador da conta na SURFconext"
            },
            "is-member-of": {
                name: "Membro",
                description: "Membro da Organização Virtual e SURFConext."
            }
        }
    }
};
