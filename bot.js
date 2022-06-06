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

  if (
    
    document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0] != null &&
    document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('div.basic-section.basic-section--appearance-horizontal-card') != null
  ){
    
    try {
      
      var urlMessage = document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').getAttribute('href');
      
    /* Проверяет список исключений, кому не нужно отправлять сообщение */
      for (var iban of ban)
      {
          if (iban == document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').innerText)
          {

              console.log('Сообщение НЕ отправлено пользователю: ' + urlMessage + ', так как вы его добавили в список исключений');
              document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].remove();
              setTimeout(test, 5000);
              return null;
          }
      }
      
      history.pushState(null, null, '/conversations' + urlMessage);
      document.querySelector('body').insertAdjacentHTML ('afterbegin', '<iframe src="/conversations' + urlMessage + '">');
      var iframe = document.querySelector('iframe');

      function sendMess ()
      {

        var textMessage = document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].querySelector('a.resume-card__title-link').innerText.split(' ')[0] + message;

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
          else {

            console.log('Сообщение НЕ отправлено пользователю: ' + urlMessage + ', так как недавно с ним уже общались');
            document.querySelectorAll('div.section-group.section-group--gap-medium ')[3].querySelectorAll('div.section-box')[0].remove();
            iframe.remove();
            test ();
          }
        }
      }
      
    } catch (err){setTimeout(test, 5000)}
  
  } else {
    
    if (document.querySelector('a[rel="next"]'))
    {
      
      document.querySelector('a[rel="next"]').click();
      setTimeout(test, 30000);
      console.log('Переключаюсь на другую страницу');
    }
  }
}

test ();
