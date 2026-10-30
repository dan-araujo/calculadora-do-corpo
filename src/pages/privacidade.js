import { AnalyticsPreferencesButton } from '../components/analytics';

export default function Privacidade() {
  return <main><section className="informacoes"><div className="conteiner-informacoes">
    <h1>Privacidade</h1>
    <h2>Dados das calculadoras</h2>
    <p>Os cálculos são realizados no seu navegador. Este site não envia o peso, a idade, as medidas corporais ou os resultados preenchidos nas calculadoras para um banco de dados ou para o Google Analytics. Ao sair ou recarregar a página, os campos são reiniciados.</p>
    <h2>Cookies e análise de uso</h2>
    <p>Com sua autorização, utilizamos cookies opcionais do Google Analytics para analisar o uso do site e orientar melhorias na experiência. O serviço recebe informações de navegação, como a página visitada e dados técnicos do acesso, e pode processar dados em infraestrutura do Google. A recusa permite continuar usando todas as calculadoras.</p>
    <p>Sua escolha é guardada no armazenamento local deste navegador. Você pode alterá-la em “Preferências de cookies”, no rodapé. A revogação interrompe novas medições neste navegador; ela não apaga automaticamente informações já processadas pelo Google.</p>
    <AnalyticsPreferencesButton />
    <h2>Hospedagem e links externos</h2>
    <p>O provedor de hospedagem pode processar registros técnicos, como endereço IP e horário de acesso, para entregar e proteger o site. As referências externas têm suas próprias políticas de privacidade.</p>
    <div className="fontes"><a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de Privacidade do Google</a><a href="https://tools.google.com/dlpage/gaoptout?hl=pt-BR" target="_blank" rel="noopener noreferrer">Complemento do navegador para desativar o Google Analytics</a></div>
  </div></section></main>;
}
