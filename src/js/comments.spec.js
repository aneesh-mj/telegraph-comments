const Comments = require("./comments");

const data = [{
	"id": 1,
	"date": "2019-04-23T22:26:43.511Z",
	"name": "Dawud Esparza",
	"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
	"likes": 22
},
{
	"id": 2,
	"date": "2019-04-23T19:26:41.511Z",
	"name": "Lennie Wainwright",
	"body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
	"likes": 43
}];

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(data)
	})
);

describe('Comments', () => {
	describe('comments', () => {

		let instance;
		let container = document.createElement("div");

		beforeEach(async () => {
			instance = new Comments(container);
			instance.initialise();
		});

		it("should render comments", () => {
			expect(instance.comments.length).toBe(2);
		});

		it("should sort by likes", () => {
			instance.sort = "date";
			instance.sortComments();
			expect(instance.comments[0].likes).toBe(43);
		});
	});
});
