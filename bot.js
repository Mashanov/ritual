var DateList = {
1: 'января',
2: 'февраля',
3: 'марта',
4: 'апреля',
5: 'мая',
6: 'июня',
7: 'июля',
8: 'августа',
9: 'сентября',
10: 'октября',
11: 'ноября',
12: 'декабря',
},
second = 30,
day = 30;

function test (){

  if (document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0] != null)
  {
    
    var urlMessage = document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').getAttribute('href');
    history.pushState(null, null, '/conversations' + urlMessage);
    document.querySelector('body').insertAdjacentHTML ('afterbegin', '<iframe src="/conversations' + urlMessage + '">');
    var iframe = document.querySelector('iframe');
    
    iframe.contentWindow.onload = function ()
    {
      
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      if (innerDoc.querySelector('div.chat__date.chat--divider'))
      {
      
        123
      }
        
      var textMessage = document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').innerText.split(' ')[0] + `, ТЕЕЕКСТОВОЕ СОООООБЩЕНИЕ`;
      
      $.ajax (
        {
          method: 'post',
          url: 'https://career.habr.com/api/frontend/conversations' + urlMessage + '/messages',
          data: {body: textMessage}
        }
      );

      console.log('Сообщение отправлено пользователю: ' + urlMessage);
      document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].remove();
      iframe.remove();
      setTimeout(test, 30000);
    }
  
  } else {
    
    if (document.querySelector('a[rel="next"]'))
    {
      
      document.querySelector('a[rel="next"]').click();
      setTimeout(test, 15000);
      console.log('Переключаюсь на другую страницу');
    }
  }
}
