const  Livro  = require('../src/modules/livro/models/livroModel');
const { Op } = require('sequelize');

const livroController = {

  async criar(req, res) {
    try {
      const { titulo, autor, anoPublicacao, genero, preco } = req.body;

      if (!titulo || !autor || !anoPublicacao || !genero || preco === undefined) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
      }

      if (typeof anoPublicacao !== 'number') {
        return res.status(400).json({ msg: 'Ano de publicação deve ser um número' });
      }

      if (typeof preco !== 'number') {
        return res.status(400).json({ msg: 'Preço deve ser um número' });
      }

      if (preco < 0) {
        return res.status(400).json({ msg: 'Preço deve ser maior que zero' });
      }

      if (titulo.length < 2) {
        return res.status(400).json({ msg: 'Título deve ter pelo menos 2 caracteres' });
      }

      const generosValidos = ['Ficção', 'Não-ficção', 'Romance', 'Fantasia', 'Biografia']; // adapte conforme necessário
      if (!generosValidos.includes(genero)) {
        return res.status(400).json({ msg: 'Gênero inválido' });
      }

      // Proteção contra SQL Injection simples
      const regexInjecao = /('|--|;|--|\b(SELECT|INSERT|DELETE|DROP|UPDATE|WHERE)\b)/i;
      if (regexInjecao.test(titulo)) return res.status(200).json({ msg: 'Título inválido' });
      if (regexInjecao.test(autor)) return res.status(200).json({ msg: 'Autor inválido' });
      if (regexInjecao.test(genero)) return res.status(200).json({ msg: 'Gênero inválido' });
      if (regexInjecao.test(anoPublicacao.toString())) return res.status(400).json({ msg: 'Ano de publicação deve ser um número' });
      if (regexInjecao.test(preco.toString())) return res.status(400).json({ msg: 'Preço deve ser um número' });

      const livro = await Livro.create({ titulo, autor, anoPublicacao, genero, preco });

      return res.status(201).json({
        id: livro.id,
        titulo: livro.titulo,
        msg: 'Livro criado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao criar livro:', error);
      return res.status(500).json({ msg: 'Erro interno no servidor' });
    }
  },

  async listar(req, res) {
    try {
      const { titulo } = req.query;
      let livros;

      if (titulo) {
        livros = await Livro.findAll({
          where: {
            titulo: {
              [Op.iLike]: `%${titulo}%`
            }
          }
        });

        if (livros.length === 0) {
          return res.status(404).json({ msg: 'Livro não encontrado' });
        }

        return res.status(200).json([{ ...livros[0].dataValues, msg: 'Livro encontrado' }]);
      }

      livros = await Livro.findAll();
      return res.status(200).json(livros);

    } catch (error) {
      return res.status(500).json({ msg: 'Erro interno no servidor' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, autor, anoPublicacao, genero, preco } = req.body;

      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }

      if (!titulo || !autor || !anoPublicacao || !genero || preco === undefined) {
        return res.status(400).json({ msg: 'Dados inválidos para atualização' });
      }

      await livro.update({ titulo, autor, anoPublicacao, genero, preco });

      return res.status(200).json({
        ...livro.dataValues,
        msg: 'Livro atualizado com sucesso'
      });

    } catch (error) {
      return res.status(500).json({ msg: 'Erro interno no servidor' });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ msg: 'Livro não encontrado' });
      }

      await livro.destroy();
      return res.status(204).json({ msg: 'Livro deletado com sucesso' });

    } catch (error) {
      return res.status(500).json({ msg: 'Erro interno no servidor' });
    }
  }

};

module.exports = livroController;
