const fs = require('fs');
const sass = require('sass');

const CAMINHO_ORIGEM = './src/styles/themes';
const CAMINHO_DESTINO = './dist';

const temas = fs.readdirSync(CAMINHO_ORIGEM);

temas.forEach((tema) => {
    const entrada = CAMINHO_ORIGEM + '/' + tema;
    const saida = CAMINHO_DESTINO + '/' + tema + '.css';

    sass.compileAsync(entrada, { charset: false })
        .then((result) => {
            fs.writeFileSync(saida, result.css.toString(), { encoding: 'utf8' });
            console.log('Tema %s compilado com sucesso!', tema);
        })
        .catch((err) => {
            console.log(err);
            console.log('Não foi possível compilar o tema %s', tema);
        })
});