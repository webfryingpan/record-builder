const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.ts$/,
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
