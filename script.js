var array_logo_img = [

	'https://sun9-51.userapi.com/impg/yiF2MTzWuVfPcXcLovGSZIjuO17g3odhsvPTpg/a7Dw4A8s42Q.jpg?size=1000x288&quality=96&sign=d61a80c8ed7b036b4d41ba189ab740e1&type=album',
	'https://sun9-20.userapi.com/impg/9E3IC7UG4HOrGsEF3uSJjZcRZXDZcAQZKxjb1A/0tUGsrWm4Mo.jpg?size=1881x1411&quality=96&sign=3be86b287114519c3cd4af6b1a5e9649&type=album'

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
	};

}, 300);

it('.black-button').click(function ()
{

	logo_time = 0;
});
