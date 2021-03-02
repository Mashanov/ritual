function openBackground (p = false, text = false)
{

	it('body').css({overflowY: 'hidden'});

	it('body').append(

		`<div id="background">
			<div id="white-block">
				<div class="p">` + p + `</div>
				<div id="close">✕</div>

				<div id="text">` + text + `</div>
			</div>
		</div>`

	, 'конец');

	it('#close').click(function ()
	{

		it('#background').kill();
		it('body').at('del', 'style');
	});
};

var array_logo_img = [

	'https://i.siteapi.org/4ysbA_QLr57vSy-mKhb8R8pRmZA=/0x0:1000x288/d13dcccfc99e3f5.s.siteapi.org/img/qm8kvgdcsu80kgw4oo4kksc8o8k4gw',
	'https://dezinfo.net/wp-content/uploads/2020/10/funeral_flowers-56a274ec5f9b58b7d0cabeac1.jpg'

],

array_logo_text = [

	'Как происходит процедура прощания',
	'Что делать если умер близкий человек'

],
i_logo = 1,
logo_time = new Date () / 1000 | 0;

setInterval (function ()
{

	if (logo_time + 10 < new Date () / 1000)
	{

		logo_time = new Date () / 1000 | 0;

		if (i_logo + 1 >= array_logo_img.length) i_logo = 0;
		else i_logo++;

		it('#img-logo').css({backgroundImage: 'url(' + array_logo_img[i_logo] + ')'});
		it('#offer').html(array_logo_text[i_logo]);
	};

}, 300);

it('.black-button').click(function ()
{

	logo_time = 0;
});