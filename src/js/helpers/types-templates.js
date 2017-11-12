let templates = {
  typesTemplateLeft: function (index, name, shortDesc, description, title, price, price1, duration, duration1, hash) {
    return `<li class="${index % 2 ? 'left' : 'right'}">
              <div class="main-description"><div class="types-inner">
                  <div class="short-description wow ${index % 2 ? 'fadeInRight' : 'fadeInLeft'}">
                      <div class="text">${shortDesc}</div><button class="more" data-hash="${hash}"><span>Подробнее</span></button>
                  </div>  
                  <div class="name wow zoomIn"><span class="number">${index < 9 ? '0' + (index + 1) : (index + 1) }</span>${name}</div>
              </div></div>
              <div class="expand-description">
                  <div class="types-inner">
                    <h2 class="title">${title}</h2>
                    <div class="desc">${description}</div>
                    <div class="info">
                      <div class="col">
                          <span>Продолжительность <span class="num">${duration}</span></span>
                          <span>Стоимость <span class="num">${price}</span></span>
                      </div> 
                      <div class="col">
                          <span>${duration1 ? 'Продолжительность <span class="num">' + duration1 + '</span>' : ''}</span>
                          <span>${price1 ? 'Стоимость <span class="num">' + price1  + '</span>' : ''}</span>
                      </div>
                    </div>  
                    <button class="less">Скрыть</button>
                  </div>
              </div>    
             </li>`;
  }
};

export default templates;