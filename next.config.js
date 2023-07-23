/**@type {import('next').NextConfig} */
module.exports = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

//output:'export'로 설정해서 static 사이트로 설정하고,
//images:{unoptimize: true} 설정을 더해주면
//static 사이트에서도 Image태그 사용할 수 있다
//이렇게 할 경우, img태그 쓸때처럼 strapi서버에서 이미지 가져오게되고
//이미지 최적화 변환도 되지 않지만, 대신 lazy loading기능을 사용할 수 있다

//또한, lazy loading기능은 img태그를 사용해도 사용할 수 있는데
//이 경우에는 images:{loader: 'custom', loaderFile: 'my-loader.js'}
//와 같이 설정을 더해줘야한다
//(위 경우 my-loader.js 파일은 이미지url return하는 파일)
//특정 플랫폼에서 이미지를 가져와야할때 사용할 수 있다
