function print_shop (from = false)
{

	if (from == false) return null;

	var n = from[0];

	it('#shop').append(

		`<div class="element-basket" data-name="` + n + `">
			<div class="p">` + n + `:</div>
		</div>`
	);

	from.splice(0, 1);

	for (var t of from)
	{

		var u = `<div class="white-voice">`;

			if (t.img) u += `<img class="voice-img" src="` + t.img + `">`;

			u += t.name + `<br>
				` + t.price + ` &#8381;
				<svg viewBox="0 0 172 172"`;

				if (t.voice) u += `data-voice="true"`;

				u += `><path d="M161.92188,25.08333l-104.14062,105.26042l-47.70312,-47.47917l-10.07812,10.30208l57.78125,57.33333l114.21875,-115.11458z"></path></svg>
			</div>`;

		it('#shop .element-basket[data-name="' + n + '"]').append(u);
	}
};

var procedure = [

	'Процедуры',

	{
		name: 'Кремация',
		price: 10000,
		voice: true,
	},

	{
		name: 'Захоронение',
		price: 5502,
	},

	{
		name: 'Подхоронение',
		price: 7000,
	},

],

coffin = [

	'Гробы',

	{
		name: 'Алый бархат',
		price: 5000,
		img: 'https://belgranit.by/assets/galleries/22/picsart_05-26-11.49.34.jpg',
		voice: true,
	},

	{
		name: 'Синий бархат',
		price: 6000,
		img: 'https://shop.ritual.ru/upload/iblock/03d/grob_atlas_glad_anons.png',
	},

	{
		name: 'Дубовый гроб',
		price: 6000,
		img: 'https://ugritual.ru/wp-content/uploads/2019/10/31eede78-6c4b-4b82-96e8-cc9b0b8daad8-768x512.jpeg',
	},

],

hearse = [

	'Катафалк',

	{
		name: 'Обычный катафалк',
		price: 5000,
		img: 'http://www.казань-ритуал.рф/media/k2/galleries/329/transport_1.jpg',
		voice: true,
	},

	{
		name: 'Элитный катафалк',
		price: 10000,
		img: 'https://otvet.imgsmail.ru/download/275704243_dd599099e7746eb08277ed1e3c15a0c6_800.jpg',
	},
];

print_shop (procedure);
print_shop (coffin);
print_shop (hearse);