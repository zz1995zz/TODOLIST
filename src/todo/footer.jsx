// jsx就是把html写到js中

import '../assets/styles/footer.styl'

export default {
	data() {
		return {
			author: 'zz1995'
		}
	},
	render() {
		return (
			<div class='footer'>
				<span>Written by {this.author}</span>
			</div>
		)
	}
}