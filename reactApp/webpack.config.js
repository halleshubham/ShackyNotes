var config = {
   entry: './main.js',
	
   output: {
      path:'/Users/shekhar/shack/reactApp',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      host: "0.0.0.0",
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;