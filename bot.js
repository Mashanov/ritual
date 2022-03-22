var DateList = {
'января': 1,
'февраля': 2,
'марта': 3,
'апреля': 4,
'мая': 5,
'июня': 6,
'июля': 7,
'августа': 8,
'сентября': 9,
'октября': 10,
'ноября': 11,
'декабря': 12,
};

function test ()
{

  if (document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0] != null)
  {
    
    var urlMessage = document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').getAttribute('href');
    history.pushState(null, null, '/conversations' + urlMessage);
    document.querySelector('body').insertAdjacentHTML ('afterbegin', '<iframe src="/conversations' + urlMessage + '">');
    var iframe = document.querySelector('iframe');
    
    function sendMess ()
    {
    
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
    
    iframe.contentWindow.onload = function ()
    {
      
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      if (innerDoc.querySelector('div.chat__date.chat--divider') == null) sendMess ();
      else {
      
        var n = innerDoc.querySelectorAll('div.chat__date.chat--divider');
        n = n[n.length - 1].innerText.split(' ');
        
        if ((new Date (n[2], (DateList[n[1]] - 1), n[0]) / 1000 + 5184000) <= (new Date () / 1000)) sendMess ();
      }
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

test ();