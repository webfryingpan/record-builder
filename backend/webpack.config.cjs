const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	target: 'node',
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/data', to: 'data' },
				{ from: 'src/secret', to: 'secret' },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'index.cjs',
		path: path.resolve(__dirname, 'dist'),
	},
}
