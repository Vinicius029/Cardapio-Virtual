//====================================== CAROSSEL DE IMAGENS ===================================================
document.addEventListener('DOMContentLoaded', function() {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    setInterval(function() {
      images[currentImageIndex].style.display = 'none';
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      images[currentImageIndex].style.display = 'block';
    }, 5000); // 5000 milissegundos = 5 segundos
  });

  //====================================== MENU PARA MOBILE ===================================================
  // ABRIR O MENU
  function toggleMenu() {
    var sideMenu = document.getElementById('sideMenu');
    if (sideMenu.style.right === '-250px') {
      sideMenu.style.right = '0';
    } else {
      sideMenu.style.right = '-250px';
    }
  }

// FUNÇÃO PARA FECHAR O MENU COM TOQUE
  document.addEventListener('click', function(event) {
    var sideMenu = document.getElementById('sideMenu');
    var isClickInsideMenu = sideMenu.contains(event.target);
    var menuToggleButton = document.querySelector('.menu-toggle');

    if (!isClickInsideMenu && event.target !== menuToggleButton) {
      sideMenu.style.right = '-250px';
    }
  });

  let cartItems = [];
  const menuItems = [
    { name: 'Hamburguer', description: 'Delicioso hambúrguer ', value: 10.00, img: 'https://th.bing.com/th/id/R.a85f8bf6d0bbbcdd5eca5d869f826ab8?rik=N5dyDjtIyT0x2A&pid=ImgRaw&r=0', category: 'lanches' },
    { name: 'Batata Frita', description: 'Batatas fritas crocantes', value: 5.00, img: 'https://vitat.com.br/wp-content/uploads/2019/12/french-fries-phr3xn9_easy-resize-e1577120471937.jpg', category: 'lanches' },
    { name: 'Coca Cola', description: 'Bebida refrescante', value: 3.00, img: 'https://th.bing.com/th/id/OIP.gOSWD16OMZ6vAMmKT8ltUwHaHa?rs=1&pid=ImgDetMain', category: 'refrigerantes' },
    { name: 'Coca Cola', description: 'Bebida refrescante', value: 3.00, img: 'https://th.bing.com/th/id/OIP.gOSWD16OMZ6vAMmKT8ltUwHaHa?rs=1&pid=ImgDetMain', category: 'refrigerantes' },
    { name: 'Hamburguer', description: 'Delicioso hambúrguer caseiro', value: 10.00, img: 'https://th.bing.com/th/id/R.a85f8bf6d0bbbcdd5eca5d869f826ab8?rik=N5dyDjtIyT0x2A&pid=ImgRaw&r=0', category: 'lanches' },
    { name: 'Batata Frita', description: 'Batatas fritas crocantes', value: 5.00, img: 'https://vitat.com.br/wp-content/uploads/2019/12/french-fries-phr3xn9_easy-resize-e1577120471937.jpg', category: 'lanches' },
    { name: 'Skol', description: 'Bebida refrescante', value: 3.00, img: 'https://cdn.awsli.com.br/1000x1000/1693/1693441/produto/91240667/b24eb5aaac.jpg', category: 'refrigerantes' },
    { name: 'Açaí na Tigela', description: 'Açaí com frutas e granola', value: 15.00, img: 'https://encurtador.com.br/knxI0', category: 'acai' },
    { name: 'Espetinho de Carne', description: 'Espetinho de carne bovina', value: 7.00, img: 'https://moonbh.com.br/wp-content/uploads/2017/08/39569d_17b81dd45235409390432f23b62372cb-mv2.jpg', category: 'espetinhos' },
    // Adicione mais itens conforme necessário
  ];

// Adicione esta função para mostrar ou ocultar a seção de informações adicionais
  function toggleAdditionalInfoSection() {
    const additionalInfoSection = document.getElementById('additional-info');
    additionalInfoSection.style.display = cartItems.length > 0 ? 'block' : 'none';
  }

  function getCEPInfo() {
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
  
    const cepValue = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  
    if (cepValue.length === 8) {
      // Se o CEP tem o tamanho correto, faça a requisição ao Via CEP
      const url = `https://viacep.com.br/ws/${cepValue}/json/`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            // Preencha os campos com os dados obtidos
            logradouroInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = `${data.localidade}-${data.uf}`;

          } else {
            alert('CEP não encontrado. Verifique o número digitado.');
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
  }
  
  // Adicione esta parte para chamar a função quando o campo CEP perder o foco
  document.getElementById('cep').addEventListener('blur', getCEPInfo);

  
  
  function addToCart(itemName, itemDescription, itemValue) {
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalValue += parseFloat(itemValue);
    } else {
      cartItems.push({ name: itemName, description: itemDescription, value: parseFloat(itemValue), quantity: 1, totalValue: parseFloat(itemValue) });
    }

    const notification = document.getElementById('notification');
    notification.textContent = 'Item adicionado: ' + itemName;
    notification.classList.add('show');

    // Remover a notificação após 3 segundos
    setTimeout(function() {
      notification.classList.remove('show');
    }, 3000);

    toggleAdditionalInfoSection();
    updateCart(); 
  }

  function removeFromCart(index) {
  cartItems.splice(index, 1);
  toggleAdditionalInfoSection();
  updateCart(); 
}

// Modifique a função updateCart no seu script.js
  function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');
    const deliveryFeeElement = document.getElementById('delivery-fee');
  
    cartList.innerHTML = '';
    let total = 0;
  
    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${item.name}</strong> - ${item.description}<br>
        <strong>Quantidade:</strong> ${item.quantity}<br>
        <strong>Total:</strong> R$ ${item.totalValue.toFixed(2)}
        <button class="remove-item-btn" onclick="removeFromCart(${index})">🗑️</button>
      `;
  
      cartList.appendChild(listItem);
  
      total += parseFloat(item.totalValue);
    });
  
    // Calcula e adiciona a taxa de entrega se o valor total for inferior a R$20,00
    const deliveryFee = total < 20 ? 5 : 0;
    total += deliveryFee;
  
    // Exibe ou oculta a div da taxa de entrega conforme necessário
    deliveryFeeElement.style.display = deliveryFee > 0 ? 'block' : 'none';
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
  
    if (deliveryFee > 0) {
      deliveryFeeElement.textContent = `Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}`;
    }
  }

  function mostrar_menu_nav(elementos, categoria){
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.display = categoria ? 'block' : 'none';
    }

  }
  
  //função que faz verificação se uma sessão tem item cadastrada, se tiver apareca a sessão na front, senão, não apareca
  function verificarSessao(lanchesContainer, refrigerantesContainer, acaiContainer, espetinhosContainer){
    // Verifique se existem itens de Açaí
    const temAcai = menuItems.some(item => item.category === 'acai');
    document.getElementById('titulo-acai').style.display = temAcai ? 'block' : 'none';
    acaiContainer.classList.add('visible')
    const acaiMenuElements = document.getElementsByClassName('acai_menu_desktop');
    mostrar_menu_nav(acaiMenuElements, temAcai);

    
    
    
    // Verifique se existem itens de Espetinho
    const temEspetinho = menuItems.some(item => item.category === 'espetinhos');
    document.getElementById('titulo-espetinho').style.display = temEspetinho ? 'block' : 'none';
    espetinhosContainer.classList.add('visible')
   
    
    const temLanches = menuItems.some(item => item.category === 'lanches');
    document.getElementById('titulo-lanche').style.display = temLanches ? 'block' : 'none';
    lanchesContainer.classList.add('visible');

    const temRefrigenrante = menuItems.some(item => item.category === 'lanches');
    document.getElementById('titulo-refrigerante').style.display = temRefrigenrante ? 'block' : 'none';
    refrigerantesContainer.classList.add('visible');
  }

  function generateMenu() {
    const lanchesContainer = document.getElementById('lanches');
    const refrigerantesContainer = document.getElementById('refrigerantes');
    const acaiContainer = document.getElementById('acai');
    const espetinhosContainer = document.getElementById('espetinhos');

    verificarSessao(lanchesContainer, refrigerantesContainer, acaiContainer, espetinhosContainer);

    const itemsPerRow = 3; // Defina o número desejado de itens por linha

    try {
      // Obter dados da API
      //const response = await fetch('https://sheetdb.io/api/v1/hbaxk8qp14jio');
      //const menuItemss = await response.json();

      // Processar cada item de menu
      menuItems.forEach((item, index) => {
        console.log(item.value)

        //const itemValue = item['value '].replace(',', '.');

          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item');
          menuItem.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <p class="description">${item.name}</p>
          <p class="description">${item.description}</p>
          <p class="value">R$ ${item.value.toFixed(2)}</p>
          <button class="add-to-cart-btn" onclick="addToCart('${item.name}', '${item.description}', ${item.value})">Adicionar ao Carrinho</button>
          `;

          // <button class="add-to-cart-btn" onclick="addToCart('${item.name}', '${item.description}', ${parseFloat(itemValue)})">Adicionar ao Carrinho</button>

          // Adiciona o card ao contêiner correspondente à categoria do item
          if (item.category === 'lanches') {
              lanchesContainer.appendChild(menuItem);
          } else if (item.category === 'refrigerantes') {
              refrigerantesContainer.appendChild(menuItem);
          } else if (item.category === 'acai') {
              acaiContainer.appendChild(menuItem);
          } else if (item.category === 'espetinhos') {
              espetinhosContainer.appendChild(menuItem);
          }

          // Adiciona um estilo extra para ajustar a largura dos itens com base na quantidade por linha
          const flexBasis = 100 / itemsPerRow;
          menuItem.style.flexBasis = `calc(${flexBasis}% - 20px)`; // 20px é a margem entre os itens

          // Adiciona uma margem à direita para separar os itens
          if ((index + 1) % itemsPerRow !== 0) {
              menuItem.style.marginRight = '20px';
          }
      });

      toggleAdditionalInfoSection();
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
  }

// Chamar a função para gerar o menu
  generateMenu();

// Função para abrir o modal de Contato
  function abrirModalContato() {
  document.getElementById('modal-contato').style.display = 'block';
}
// Função para fechar o modal de Contato
  function fecharModalContato() {
    document.getElementById('modal-contato').style.display = 'none';
  }

  function getTotal() {
    let total = 0;
    let hasDeliveryFee = false;

    cartItems.forEach((item) => {
      total += parseFloat(item.totalValue);
    });

    // Adiciona a taxa de entrega se o total for inferior a R$20,00
    const deliveryFee = total < 20 ? 5 : 0;
    if (deliveryFee > 0) {
        hasDeliveryFee = true;
    }
    total += deliveryFee;

    return { total: total.toFixed(2), hasDeliveryFee };
}
  // Adicione esta função para fechar o modal
  function fecharModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  function getEndereco() {
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const pontoReferencia = document.getElementById('ponto-referencia').value;

    return {
        "CEP": cep,
        "Logradouro": logradouro,
        "Número": numero,
        "Bairro": bairro,
        "Cidade": cidade,
        "Ponto_Referência": pontoReferencia
    };
  }

  //====================================== PAGAMENTOS============================================
  function handlePaymentMethod() {
    const paymentMethodSelect = document.getElementById('payment-method');
    const trocoContainer = document.getElementById('troco-container');
  
    if (paymentMethodSelect.value === 'money') {
      // Se a forma de pagamento for dinheiro, mostra o campo de troco
      trocoContainer.style.display = 'block';
    } else {
      // Se for outra forma de pagamento, esconde o campo de troco
      trocoContainer.style.display = 'none';
    }
  }
  // Adicione esta parte para chamar a função quando o campo de pagamento for alterado
  document.getElementById('payment-method').addEventListener('change', handlePaymentMethod);

  function validarTroco() {
const { formaPagamento, troco } = getFormaPagamento();
const { total } = getTotal();

if (formaPagamento === 'money' && troco < parseFloat(total)) {
  alert('O valor do troco deve ser maior ou igual ao total do pedido.');
  return false;
}

return true;
}

  function getFormaPagamento() {
    const paymentMethodSelect = document.getElementById('payment-method');
    const trocoInput = document.getElementById('troco');

    const selectedOption = paymentMethodSelect.options[paymentMethodSelect.selectedIndex];
    const metodo_pagamento_texto = selectedOption.text;
    
    let formaPagamento = paymentMethodSelect.value;
    let troco = parseFloat(trocoInput.value) || 0;
    console.log(formaPagamento, troco, )

    return { formaPagamento, troco, metodo_pagamento_texto };
  }

  function getObservacaoPedido(){
    return document.getElementById('info-input').value;
  }
    
  function getNome() {
    return document.getElementById('nome').value;
  }

  function getTelefone() {
    return document.getElementById('telefone').value;
  }

  function enviarPedido(dados_pedido) {
    const observacaoPedido = getObservacaoPedido();
    const nome = getNome();
    const telefone = getTelefone();
    const endereco = getEndereco();
    const { formaPagamento, troco } = getFormaPagamento();
    const { total, hasDeliveryFee } = getTotal();

    fecharModal();

    let textoFormaPagamento = formaPagamento.charAt(0).toUpperCase() + formaPagamento.slice(1);
    let valorTroco = troco - parseFloat(total);

    if (formaPagamento === 'money') {
      textoFormaPagamento = `Dinheiro (Recebido: R$ ${troco.toFixed(2)})\n\n*Troco para mandar*: R$ ${valorTroco.toFixed(2)}`;
      
      console.log(textoFormaPagamento)
    }

    const mensagem = `*NOVO PEDIDO*\n\n*📝 Pedido de*: ${nome}\n*📞 Telefone*: ${telefone}\n\n🍔🍟🥪🥤 *PEDIDOS*:\n${cartItems.map(item => `${item.quantity}x ${item.name}\nValor Unitário R$ ${item.value}\nValor Total R$ ${item.totalValue.toFixed(2)}\n=================\n`).join('')}\n📝Observação do Pedido: ${observacaoPedido}\n\n📍 *ENDEREÇO*:\nCEP: ${endereco.CEP}\nLogradouro: ${endereco.Logradouro}\nNúmero: ${endereco.Número}\nBairro: ${endereco.Bairro}\nCidade: ${endereco.Cidade}\nPonto de Referência: ${endereco.Ponto_Referência}\n\n💵 *Forma de Pagamento*: ${textoFormaPagamento}\n\n💰 *Total*: ${total}`;

    // Enviar a mensagem para o WhatsApp
    enviarMensagemWhatsApp(mensagem);
  }

  function enviarMensagemWhatsApp(mensagem) {
      const numeroWhatsApp = '5565981417835';
      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
      
      // Abre a URL no navegador (ou use outra maneira de enviar a mensagem, dependendo da API escolhida)
      window.open(urlWhatsApp, '_blank');
  }


  function validarCamposObrigatorios() {
    const campos = [
      { id: 'nome', mensagem: 'O campo Nome precisa ser preenchido.' },
      { id: 'telefone', mensagem: 'O campo Telefone precisa ser preenchido.' },
      { id: 'logradouro', mensagem: 'O campo Logradouro precisa ser preenchido.' },
      { id: 'numero', mensagem: 'O campo Número precisa ser preenchido.' },
      { id: 'bairro', mensagem: 'O campo Bairro precisa ser preenchido.' },
      { id: 'cidade', mensagem: 'O campo Cidade precisa ser preenchido.' }
    ];

    for (let campo of campos) {
      const elemento = document.getElementById(campo.id);
      if (!elemento.value.trim()) {
        alert(campo.mensagem);
        elemento.focus(); // Foca no campo que está vazio
        return false;
      }
    }

    return true;
  }

  function finalizarPedido() {
    if (cartItems.length === 0) {
      alert('Adicione itens ao carrinho antes de finalizar o pedido!');
      return;
    }

    if (!validarCamposObrigatorios()) {
      return;
    }

    if (!validarTroco()) {
      return;
    }

    const observacaoPedido = getObservacaoPedido();
    const nome = getNome();
    const telefone = getTelefone();
    const endereco = getEndereco();
    const { formaPagamento, troco, metodo_pagamento_texto } = getFormaPagamento();
    const { total, hasDeliveryFee } = getTotal();

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
      <div class="order-details">
        <h2>Detalhes do Pedido</h2><br>
        <hr>
        <p><strong>Observação do Pedido:</strong> ${observacaoPedido}
        <hr>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <hr>
        <p><strong>Endereço:</strong><br> CEP:${endereco.CEP}<br>Logradouro: ${endereco.Logradouro}<br>Número: ${endereco.Número}<br> Bairro: ${endereco.Bairro}<br> Cidade: ${endereco.Cidade}<br>Ponto de Referência: ${endereco.Ponto_Referência}</p>
        <hr>
        ${cartItems.map(item => `<p>${item.quantity}x ${item.name} <br>- Valor Unitário R$ ${item.value} <br>- Valor Total R$ ${item.totalValue.toFixed(2)}</p>`).join('')}
        <hr>
        <p><strong>Forma de Pagamento:</strong> ${metodo_pagamento_texto}</p>
        ${hasDeliveryFee ? `<p><strong>Taxa de Entrega:</strong> R$ 5,00</p>` : ''}
        <br>
        <p><strong>Total do Pedido:</strong> R$ ${total}</p>
      </div>
      <button onclick="enviarPedido()" class="finalizar-pedido-btn">Pedir</button>
      <button onclick="fecharModal()" class="cancelar-pedido-btn">Cancelar</button>
    `;

    // Exibe o modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }

  toggleAdditionalInfoSection();
