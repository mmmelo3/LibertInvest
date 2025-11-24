
let valorReserva = 0;
let graficoCarteira = null; // variável global para armazenar o gráfico

// ✅ Usando as mesmas descrições e links do código original
const investimentosInfo = {
    'tesouro ipca+': {
        descricao: 'Tesouro IPCA+ é um título público de renda fixa que garante uma rentabilidade acima da inflação, o que protege o poder de compra do investidor. Sua remuneração é composta por uma taxa prefixada (definida no momento da compra) mais a variação do IPCA (Índice Nacional de Preços ao Consumidor Amplo), que é o índice oficial de inflação do Brasil.',
        link: 'https://www.bb.com.br/site/investimentos/tesouro-direto/?gad_source=1&gad_campaignid=22819962380'
    },
    'ações': {
        descricao: 'Ações são pequenas frações do capital de uma empresa que podem ser compradas e vendidas na Bolsa de Valores, tornando o investidor um sócio da companhia. Ao adquirir uma ação, o investidor passa a ter uma parte do negócio e pode participar dos lucros (dividendos) ou sofrer com as perdas da empresa. As ações podem ser de diferentes tipos, como ordinárias (com direito a voto) e preferenciais (com preferência no recebimento de lucros), e seu preço flutua de acordo com a oferta, a demanda e o desempenho da empresa.',
        link: 'https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/acoes.htm'
    },
    'fiis': {
        descricao: 'FIIs são Fundos de Investimento Imobiliário, um tipo de investimento coletivo onde pessoas unem seus recursos para investir em ativos imobiliários, como imóveis físicos (shoppings, prédios, galpões) ou títulos de dívida imobiliária (CRIs, LCIs). Em vez de comprar um imóvel diretamente, os investidores compram cotas do fundo e recebem rendimentos dos aluguéis ou da valorização dos ativos, geralmente com isenção de Imposto de Renda sobre os rendimentos mensais.',
        link: 'https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-variavel/fundos-de-investimento-imobiliario-fii.htm'
    },
    'stocks': {
        descricao: '"Stocks" são ações de empresas negociadas na bolsa de valores, especificamente as americanas, como a NYSE e a Nasdaq. Ao comprar uma "stock", um investidor adquire uma pequena fração da propriedade dessa empresa, tornando-se um acionista. Essa compra pode gerar ganhos através da valorização do preço da ação ou do recebimento de dividendos (parte dos lucros da empresa).',
        link: 'https://investidorsardinha.r7.com/aprender/stock-mercado-acoes/'
    },
    'reits': {
        descricao: 'REITs são empresas que investem em imóveis que geram renda, como shoppings, prédios de escritórios e hotéis, permitindo que investidores individuais comprem ações ou cotas e se tornem donos de uma fração de todo o portfólio. Ao comprar REITs, os investidores recebem rendimentos provenientes de aluguéis e lucros, sendo que empresas de REITs nos EUA são obrigadas a distribuir pelo menos 90% de sua receita tributável em dividendos. São uma forma de investir no mercado imobiliário com a liquidez e simplicidade da bolsa de valores.',
        link: 'https://borainvestir.b3.com.br/glossario/reits-real-estate-investment-trust/'
    }
};

function iniciarCarteira() {
    document.getElementById('reserva-section').style.display = 'block';
}

function calcularReserva() {
    const despesas = parseFloat(document.getElementById('despesas').value);
    const meses = parseInt(document.getElementById('meses').value);
    if (isNaN(despesas) || isNaN(meses) || despesas <= 0 || meses <= 0) {
        alert('Preencha valores válidos');
        return;
    }
    valorReserva = despesas * meses;
    document.getElementById('resultado-reserva').innerText = 'Sua reserva de emergência deve ser: R$ ' + valorReserva.toFixed(2);
    document.getElementById('investimentos-section').style.display = 'block';
}

function distribuirInvestimentos() {
    const valorInvestir = parseFloat(document.getElementById('valor-investir').value);
    if (isNaN(valorInvestir) || valorInvestir <= 0) {
        alert('Informe um valor válido para investir');
        return;
    }

    document.getElementById('grafico-section').style.display = 'block';
    document.getElementById('busca-section').style.display = 'block';

    const rendaFixa = valorInvestir * 0.5;
    const rendaVariavel = valorInvestir * 0.5;
    const brasil = rendaVariavel * 0.7;
    const eua = rendaVariavel * 0.3;
    const acoes = brasil * 0.5;
    const fiis = brasil * 0.5;
    const stocks = eua * 0.5;
    const reits = eua * 0.5;

    const ctx = document.getElementById('graficoCarteira').getContext('2d');

    // ✅ Destruir gráfico anterior se existir
    if (graficoCarteira) {
        graficoCarteira.destroy();
    }

    graficoCarteira = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Tesouro IPCA+', 'Ações (Brasil)', 'FIIs (Brasil)', 'Stocks (EUA)', 'REITs (EUA)'],
            datasets: [{
                data: [rendaFixa, acoes, fiis, stocks, reits],
                backgroundColor: ['#28a745', '#007bff', '#6f42c1', '#ffc107', '#fd7e14']
            }]
        },
        options: { responsive: true }
    });

    const tabelaBody = document.querySelector('#tabela-valores tbody');
    tabelaBody.innerHTML = '';
    const ativos = [
        ['Tesouro IPCA+', rendaFixa],
        ['Ações (Brasil)', acoes],
        ['FIIs (Brasil)', fiis],
        ['Stocks (EUA)', stocks],
        ['REITs (EUA)', reits]
    ];
    ativos.forEach(([nome, valor]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${nome}</td><td>R$ ${valor.toFixed(2)}</td>`;
        tabelaBody.appendChild(tr);
    });
}

function buscarInvestimento(){ const termo=document.getElementById('campo-busca').value.toLowerCase().trim(); const resultado=document.getElementById('resultado-busca'); resultado.innerHTML=''; if(investimentosInfo[termo]){ const info=investimentosInfo[termo]; resultado.innerHTML=`<p>${info.descricao}</p><a href='${info.link}' target='_blank'>Saiba mais</a>`; } else { resultado.innerHTML='<p>Investimento não encontrado. Tente Tesouro IPCA+, Ações, FIIs, Stocks ou REITs.</p>'; } }

function limparInvestimento() {
    document.getElementById('valor-investir').value = '';
    document.getElementById('grafico-section').style.display = 'none';
    document.getElementById('investimentos-section').style.display = 'block';
    document.querySelector('#tabela-valores tbody').innerHTML = '';

    if (graficoCarteira) {
        graficoCarteira.destroy();
        graficoCarteira = null;
    }
}
