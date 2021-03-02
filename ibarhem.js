// Ibarhem script ( Движок )

/*
*	ВЕРСИЯ - 1.0.0.0
* 	РАЗРАБОТЧИК - Данил Машанов
*	ПОСЛЕДНЕЕ РЕДАКТИРОВАНИЕ - 15.8.2020
*/

var d = document, s = self || window, name_url, url, x, i, y;

/* Обрабатка сигнала и посыл в двигатель */
const it = (i) => {

	if (typeof i != 'object' && typeof i != 'string') return console.error ('Ошибка в передаваемых данных: ' + i);

/* Если в качестве объекта указан элемент */
	if (typeof i == 'object')
	{

		if (i != d) return console.error ('Ошибка в передаваемых данных: ' + i);

	} else {

		if (typeof i == 'string' && d.querySelector(i)) i = d.querySelectorAll(i);
		else return console.error ('Ошибка в передаваемых данных: ' + i);
	};

/* Возвращаем функцию, запускаем движок и передаем объект */
	return new Ibarhem (i);
};


// Движок
/*==========================================*/
const Ibarhem = function (element)
{

/* Получаем объект с функции */
	this.element = element;

/*==========================================*/

// Функция Добавления клика
	this.click = (fun) => {

	/* Проверка на функцию */
		if (typeof fun != 'function')
		{

		/* Если нужен клик */
			if (fun != null) return null;

		/* Кликаем */
			return this.element[0].click();
		};

	/* Если передали документ, ловим клики со всего документа */
		if (this.element == d) d.addEventListener('click', fun);

	/* Если передали обычный объект */
		else for (var i = 0; i < this.element.length; i++)
		{

		/* Ловим клики с элемента */
			this.element[i].addEventListener('click', fun);
		}
	};

/*==========================================*/

// Функция Удаленя клика
	this.reclick = (fun) => {

	/* Если передали НЕ функцию */
		if (typeof fun != 'function') return null;

	/* Если передали документ ловим клики со всего документа */
		if (this.element == d) return d.removeEventListener('click', fun);

	/* Если передали обычный объект */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Ловим клики с элемента */
			this.element[i].removeEventListener('click', fun);
		}
	};

/*==========================================*/

// Функция вставки html
	this.html = (text) => {

	/* Если передали документ */
		if (this.element == d) return d.write (text);

		if (text == null)
		{

			if (this.element[0].tagName == 'INPUT' || this.element[0].tagName == 'TEXTAREA') return this.element[0].value;

			return this.element[0].innerHTML;
		};

		if (typeof text == 'string' || typeof text == 'number')
		for (var i = 0; i < this.element.length; i++)
		{

			if (this.element[i].tagName === 'INPUT' || this.element[i].tagName === 'TEXTAREA') this.element[i].value = text;
			else this.element[i].innerHTML = text;
		}
	};

/*==========================================*/

// Функция CSS
	this.css = (property) => {

	/* Ищем элемент какой будем смотреть */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Если передали объект, перебираем свойства и значения по одному */
			if (typeof property == 'object') for (var sv in property)
			{

				this.element[i].style[sv] = property[sv];

		/* Если передали свойство ( строку ), возвращаем свойство заданного элемента */
			} else if (typeof property == 'string') return s.getComputedStyle(this.element[i])[property];
		}
	};

/*==========================================*/

// Функция сбора имён для ajax
	this.whois = () => {

	/* Перебираем элементы откуда брать имена */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Собираем все элементы с неймом */
			var whois = this.element[i].querySelectorAll("*[name]");

		/* Перменные для удобства */
			var att = '', ump = '';

		/* Смотрим каждый элемент */
			for (var el of whois)
			{

				if (el.tagName == 'INPUT' || el.tagName == 'TEXTAREA')
				{

					if (el.value != '')
					{

					/* Если не первое свойство запроса */
						if (att != '') ump = '&';

					/* Собираем во едино */
						att += ump + el.name + '=' + encodeURIComponent(el.value);
					}

				} else {

					if (el.innerText != '')
					{

					/* Если не первое свойство запроса */
						if (att != '') ump = '&';

					/* Собираем во едино */
						att += ump + el.getAttribute('name') + '=' + el.innerText;
					}
				}
			};

		/* Возвращаем итог */
			return att;
		}
	};

/*==========================================*/

// Функция удаления элементов
	this.kill = () => {

	/*
	* Ищем элементы
	* Удаляем их
	*/
		for (var i = 0; i < this.element.length; i++)
		{

			this.element[i].remove();
		}
	};

/*==========================================*/

// Функция добавления, удаления и смотра атрибута
	this.at = (type, name, value) => {

	/* Ищем элементы куда нужно добавить атрибут */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Добавляем */
			if (type == 'new') this.element[i].setAttribute(name, value);
			else {

			/* Удаляем */
				if (type == 'del') this.element[i].removeAttribute(name);

			/* возвращаем ответ */
				else if (type == 'get') return this.element[i].getAttribute(name);
			}
		}
	};

/*==========================================*/

// Функция ставки фокуса
	this.focus = (value) => {

	/* Ищем элементы куда нужно поставить фокус */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Если пользователю нужно ставить фокус */
			if (value == null) this.element[i].focus();
			else {

			/* Если пользователю нужно посмотреть есть ли фокус */
				if (value == 'get')
				{

				/*
				* Если фокус есть
				* Возвращаем true
				* Иначе возвращаем false
				*/
					return this.element[i] === d.activeElement ? true : false;

			/* Если передали функцию */
				} else if (typeof value == 'function') this.element[i].addEventListener('focus', value);
			}
		}
	};

/*==========================================*/

// Функция удаления фокуса
	this.blur = (value) => {

	/* Ищем элементы куда нужно поставить фокус */
		for (var i = 0; i < this.element.length; i++)
		{

		/* Если пользователю не нужно убирать фокус */
			if (

				value != null &&
				typeof value == 'function'

			) this.element[i].addEventListener('blur', value);

		/* Убираем фокус */
			else if (value == null) this.element[i].blur();
		}
	};

/*==========================================*/

// Функция форм кнопок
	this.form = (fun = false) => {

		if (

			fun == false ||
			typeof fun != 'function'

		) return null;

		this.element[0].addEventListener("submit", function ()
		{

		/* Перебиваем url переход формы */
			event.preventDefault ();

		/* Запускаем функцию */
			fun ();
		});
	};

/*==========================================*/

// Функция Добавления
	this.append = (from = false, type = 'конец') => {

		if (from == false) return null;

		for (var i = 0; i < this.element.length; i++)
		{

			if (type == 'конец') position_append = 'beforeend';
			else if (type == 'перед') position_append = 'afterbegin';
			else if (type == 'до') position_append = 'beforebegin';
			else if (type == 'после') position_append = 'afterend';

			this.element[i].insertAdjacentHTML (position_append, from);
			
		}
	};

/*==========================================*/

// Функция редактирования блоков
	this.move = (from = false) => {

		if (

			from == false ||
			typeof from != 'function'

		) return null;

		for (var i = 0; i < this.element.length; i++)
		{

			this.element[i].addEventListener('mousedown', function ()
			{

				it('body').css({userSelect:'none'});

				function finish ()
				{

					it('body').css({userSelect:''});
					it(d).off('mousemove', from);
					it(d).off('mouseup', finish);
				};

				it(d).on('mousemove', from);
				it(d).on('mouseup', finish);
			})
		}
	};

/*==========================================*/

// Функция автоматического расширения
	this.size = (from = false) => {

	/* Проверка на запрос */
		if (from == false || typeof from != 'string') return null;

		let element = this.element[0];

		if (from != 'y')
		{

			maxw = s.getComputedStyle(element)['max-width'];
			minw = s.getComputedStyle(element)['min-width'];

		} else {

			maxw = s.getComputedStyle(element)['width'];
			minw = s.getComputedStyle(element)['width'];
		};


		if (from != 'x')
		{

			maxh = s.getComputedStyle(element)['max-height'];
			minh = s.getComputedStyle(element)['min-height'];

		} else {

			maxh = s.getComputedStyle(element)['height'];
			minh = s.getComputedStyle(element)['height'];
		};

		var lipa_element = d.createElement('div');
		lipa_element.id = 'ibarhem-lipa-element-context';
		d.body.appendChild(lipa_element);

		var font = s.getComputedStyle(element)['font'] == null ? '1em Arial' : s.getComputedStyle(element)['font'];

		var padding = s.getComputedStyle(element)['padding'] == null ? '0' : s.getComputedStyle(element)['padding'];

		var boxs = s.getComputedStyle(element)['box-sizing'] == null ? 'unset' : s.getComputedStyle(element)['box-sizing'];

		it('#ibarhem-lipa-element-context').css({

			position: 'absolute',
			overflowWrap: 'break-word',
			font: font,
			padding: padding,
			maxWidth: maxw,
			minWidth: minw,
			maxHeight: maxh,
			minHeight: minh,
			boxSizing: boxs,
		});

		d.querySelector('#ibarhem-lipa-element-context').innerText = element.value;

		switch (from)
		{

			case 'x':
				element.style.width = it('#ibarhem-lipa-element-context').css('width');
				break;

			case 'y':
				element.style.height = it('#ibarhem-lipa-element-context').css('height');
				break;

			case 'xy':
				element.style.width = it('#ibarhem-lipa-element-context').css('width');
				element.style.height = it('#ibarhem-lipa-element-context').css('height');
				break;
		};

		it('#ibarhem-lipa-element-context').kill();
	};

/*==========================================*/

// Функция отслеживания изменения текста в поле ввода
	this.input = (type = false, fun = false) => {

		if (

			type == false ||
			fun == false ||
			typeof type != 'string' ||
			typeof fun != 'function'

		) return null;

		if (type == 'on') this.element[0].addEventListener('input', fun);
		else if (type == 'off') this.element[0].removeEventListener('input', fun);
	};

/*==========================================*/

// Функция добавления событий
	this.on = (events = false, from = false) => {

		if (

			event == false ||
			from == false ||
			typeof from != 'function' ||
			typeof events != 'string'

		) return null;

		if (this.element == d) return d.addEventListener(events, from);

		var i = 0;
		while (i < this.element.length)
		{

			if (events.indexOf(',') === -1) this.element[i].addEventListener(events, from);
			else {

				var n = events.split(',');

				for (var u = 0; u != n.length; u++)
				{

					this.element[i].addEventListener(n[u].trim(), from);
				}
			};

			i++;
		}
	};

/*==========================================*/

// Функция удаления событий
	this.off = (events = false, from = false) => {

		if (

			event == false ||
			from == false ||
			typeof from != 'function' ||
			typeof events != 'string'

		) return null;

		if (this.element == d) return d.removeEventListener(events, from);

		var i = 0;
		while (i < this.element.length)
		{

			if (events.indexOf(',') === -1) this.element[i].removeEventListener(events, from);
			else {

				var n = events.split(',');

				for (var u = 0; u != n.length; u++)
				{

					this.element[i].removeEventListener(n[u].trim(), from);
				}
			};

			i++;
		}
	};

/*==========================================*/

// Конец движка
// Далее функции, которые могут обойтись без начального элемента
};


/*==========================================*/

// Функция AJAX
	const ajax = function (data)
	{

	/* Если передали не объект */
		if (typeof data != 'object') return null;

	/* Создаем XHR объект */
		const xhr = new XMLHttpRequest();

	/* Функция ошибки при загрузке */
		if (data.error != null)
		{

			if (typeof data.error != 'function') return 'Функция при ошибке не задана';

			xhr.addEventListener('error', data.error);
		};

	/* Если ГЕТ запрос создаем URL */
		if (data.method == 'GET') data.url += '?' + data.data;

	/* Формируем запрос */
		xhr.open(data.method, data.url, true);

	/* Если передается НЕ файл */
		if (data.type != 'file')
		{

		/* Кодируем */
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.setRequestHeader('X-Requested-With', 'xhrHttpRequest');

		/* Если пользователь авторизован */
			try {

				client.sync_key;

			/* Если данные для запроса уже есть */
				if (data.data != null) data.data += '&log=' + client.sync_key + '&time-log=' + client.time_sync_key;
				else data.data = 'log=' + client.sync_key + '&time-log=' + client.time_sync_key;

			} catch {}
		};

	/* После выполнения запроса */
		xhr.onreadystatechange = function ()
		{

		/* Если все хорошо и ответ пришел */
			if (xhr.status == 200 && xhr.readyState == 4)
			{

			/* Если пользователь авторизован */
				try {

					client.sync_key;

				/* Если случилось расхождение во времени */
					switch (xhr.response)
					{

						case 'sync time error':
							d.location.reload ();
							return null;
							break;

						case 'welcome':
							d.location.href = "/welcome";
							return null;
							break;

						default:

						/* Обновляем датчики интернета и событий - вдруг они выключены */
							start ();
							break;
					};

				} catch {};

			/* Если НЕ указали куда возвращать */
				if (data.success == null) return xhr.response;

			/* Если при успехе возвращать в html */
				if (typeof data.success == 'string')
				{

				/* Кидаем ответ на страницу */
					it(data.success).html(xhr.response);

			/* Если нужно выполнить функцию */
				} else if (typeof data.success == 'function'){

				/* Выполняем функцию,
				В тело функции передаем ответ */
					data.success (xhr.response);
				};

			/* Если ну нужно исполнять JS закрываем функцию */
				if (data.js == false) return null;

			/* Проверяем есть ли тег скрипта в ответе */
				if (xhr.response.match('<script') != null)
				{

				/* Собираем все теги скрипта во едино */
					var div = d.createElement('div');
					div.innerHTML = xhr.response;

					var select = div.querySelectorAll("script");

				/* Перебираем скрипты по очереди */
					for (var i = 0; i < select.length; i++)
					{

					/* Если не нужно залазить в файл а просто запустить скрипт */
						if (!select[i].getAttribute('src')) s.eval (select[i].innerHTML);

					/* Если нужно сначала прочитать файл */
						else {

						/* Читаем файл */
							fetch (select[i].getAttribute('src')).then(function (response)
							{

							/* Если при получении файла произошла ошибка */
								if (response.status !== 200) console.error ('Ошибка HTTP:' + response.status);

							/* Если файл прочелся успешно */
								else {

									response.text().then(

									/* Если с текстом все хорошо */
										result => {

											let text = result;

											if (

												text != null &&
												text != ''

											) s.eval (text);

									/* Если произошла ошибка */
										}, error => {

											console.error ("Ошибка в promise: " + error);
										}
									);
								}
							});
						}
					}
				}
			}
		};

	/* Делаем отправку */
		data.method == 'POST' ? xhr.send(data.data) : xhr.send();
	};

/*==========================================*/

// Функция изменения URL
const his = function (from = false)
{

	if (from == false || typeof from != 'string') return null;

	history.pushState(null, null, from);

	page_router ();
};

/*==========================================*/

// Выполнение функций после загрузки страинцы
const fun = function (from = false)
{

/* Если передана НЕ функция */
	if (

		from == false ||
		typeof from != 'function'

	) return null;

/*
* Если документ загружен
*
* Запускаем действия Иначе
* Выполняем действия после загрузки DOM дерева
*
*/
	d.readyState == "complete" ? from () : s.addEventListener("DOMContentLoaded", from);
};

/*==========================================*/

// Функция Отслеживания поворота
const rot = function (type = false, from = false)
{

	if (

		type == false ||
		from == false ||
		typeof type != 'string' ||
		typeof from != 'function'

	) return console.error('Ошибка в переданных данных');

	if (type === 'on') s.addEventListener("orientationchange", from);
	else if (type === 'off') s.removeEventListener("orientationchange", from);
};

/*==========================================*/

// Функция поиска ключа по значению
const find_object = function (object = false, value = false)
{

	if (object == false || value == false) return null;

	return Object.keys(object).find(key => object[key] === value);
};