import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link href='https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap' rel='stylesheet' />
          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        </Head>
        <body className='font-sans text-gray-700 dark:text-zinc-100 dark:bg-zinc-900 transition-colors duration-200 ease-out'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
