class Currency{
  // Другие видео 
  // https://www.youtube.com/results?search_query=%D0%BA%D0%B0%D0%BA+%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C+%D0%B2%D0%B0%D0%BB%D1%8E%D1%82%D1%8B+%D0%BD%D0%B0+%D1%81%D0%B0%D0%B9%D1%82+js
  // HTML -> <select id="currency"></select>
  // https://www.cbr-xml-daily.ru/
  static urlApiCurrency='https://www.cbr-xml-daily.ru/daily_json.js';

  // Получает данные о валютах
  static async gets(){
    return await fetch(this.urlApiCurrency)
    .then(res=>res.json())
    .then(data=>data).catch(err=>console.log(err))
  }

  // Добавляет option в select
  // Сохраняет и так же вставляет по умолчанию
  static async addOption(data,elID){
    let str=``;
    let elId=document.querySelector(elID)
    let getCStorage=localStorage.getItem('currency_id')
    elId.innerHTML=''
    let defaultSelected=true;
    
    if(getCStorage){
      for(let [key, val] of Object.entries(data)) {
        if(getCStorage===val['ID']){
          str+=`<option selected value="${val['ID']}">${key}</option>`
        }else{
          str+=`<option value="${val['ID']}">${key}</option>`
        }
      }
    }else{
      for(let [key, val] of Object.entries(data)) {
        if(defaultSelected){
          localStorage.setItem('currency_id',val['ID'])
          defaultSelected=false
          str+=`<option selected value="${val['ID']}">${key}</option>`
        }else{
          str+=`<option value="${val['ID']}">${key}</option>`
        }
      }
    }
    
    elId.innerHTML=str
  }

  // вызывает функцию, чтоб от рендерить валюту
  static async renderOption(idSelect){
    let currencyData=await this.gets();
    if(await currencyData){
      this.addOption(currencyData.Valute,'#currency')
    }
  }
}

// export {Currency};

/*
как использовать 
HTML -> <select id="currency"></select>

document.querySelector('#currency').addEventListener('change',async e=>{
  localStorage.setItem('currency_id',e.target.value)
  Currency.renderOption('#currency')
})

window.onload=async e=>{
  Currency.renderOption('#currency')
}
*/
