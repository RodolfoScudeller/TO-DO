# API de Gerenciamento de Tarefas

Bem-vindo à API de Gerenciamento de Tarefas! Esta API foi desenvolvida para fornecer uma maneira eficiente de criar, atualizar, listar e excluir tarefas em um ambiente de gerenciamento de projetos. Através desta documentação, você encontrará informações detalhadas sobre como interagir com os endpoints disponíveis e como integrar a API em seus próprios aplicativos.

## 1. Objetivo

O principal objetivo desta API é facilitar o gerenciamento de tarefas em projetos, proporcionando aos desenvolvedores uma interface robusta para manipulação de dados de tarefas. Com a API de Gerenciamento de Tarefas, você pode realizar operações como:

- Criar uma nova tarefa
- Atualizar o status de uma tarefa
- Listar todas as tarefas ou filtrar com base em critérios específicos
- Excluir uma tarefa existente

## 2. Base URL

Todas as requisições para a API devem ser feitas para a seguinte URL base:


Certifique-se de ajustar a porta conforme necessário, dependendo de como sua aplicação local está configurada. Lembre-se de que a porta pode ser configurada dinamicamente usando a variável de ambiente `process.env.PORT`. Ao implantar a aplicação em ambientes diferentes, essa variável pode ser usada para garantir que a aplicação seja acessível em uma porta apropriada para esse ambiente.

### 3. Exemplo de URL Completa Local

Para obter todas as tarefas localmente, a URL completa seria:

http://localhost:3000/tasks

Ao implantar a API em outros ambientes, a porta pode ser configurada dinamicamente usando a variável de ambiente `process.env.PORT`. Certifique-se de ajustar a URL conforme necessário ao implantar em ambientes diferentes.

Continue lendo para obter informações detalhadas sobre os endpoints disponíveis, os parâmetros de requisição e exemplos de uso.

## 4. Rotas Disponíveis

A tabela a seguir lista os endpoints disponíveis na API.

| Método | Rota                  | Descrição                          | Parâmetros de Requisição                               |
|--------|-----------------------|------------------------------------|--------------------------------------------------------|
| GET    | `/tasks`              | Obtém todas as tarefas            | -                                                      |
| GET    | `/tasks/:id`          | Obtém uma tarefa específica       | `id` (ID da tarefa)                                     |
| POST   | `/tasks`              | Cria uma nova tarefa              | Para criar uma tarefa, os campos necessarios sao: `title`, `description`, `endDate`, `status`, `priority`, `owner`, `active`  |
| PUT    | `/tasks/:id`          | Atualiza uma tarefa existente     | É possivel alterar os seguintes campos de uma tarefa: `title`, `description`, `endDate`, `status`, `priority`, `owner`, `active`|
| DELETE | `/tasks/:id`          | Exclui uma tarefa                | `id` (ID da tarefa)                                     |

**Consulte a sessão de descrição de parâmetros para mais informações sobre.**

### 4. Descrição dos Parâmetros

- `id`: Número inteiro representando o identificador único da tarefa. 
- `title`: String contendo o título da tarefa.
- `description`: String contendo a descrição detalhada da tarefa.
- `status`: String representando o status atual da tarefa (por exemplo, "to do", "doing", "done").
- `priority`: String contendo a prioridade da tarefa ( por exemplo, "high", "medium", "low").
- `owner`: String contendo o proprietário da tarefa.
- `active`:  Boleano indicando se tarefa esta ativa.

## 5. Paginação

A API suporta a paginação para facilitar a recuperação de grandes conjuntos de dados. Os parâmetros de paginação podem ser utilizados para controlar a quantidade de dados retornados em cada resposta.

### 5.1. Parâmetros de Paginação

- `page` (opcional): Número da página desejada.

#### Exemplo de Requisição com Paginação

**GET /tasks?page=2**

    Isso retornará a segunda página.

## 6. Formato de Erros

Em caso de erro, a API retornará uma resposta JSON contendo informações sobre o erro ocorrido. Essas respostas seguem um formato consistente para facilitar o tratamento de erros pelos desenvolvedores.

### 6.1. Campos Comuns em Respostas de Erro

- `error`: Uma string indicando o tipo de erro.
- `message`: Uma descrição detalhada do erro.
- `status`: O código de status HTTP correspondente ao erro.

## 7. Cenários de Uso

Esta seção fornece exemplos práticos de como utilizar a API em cenários comuns. Cada exemplo inclui uma descrição do cenário, uma requisição de exemplo e a resposta esperada.

### 7.1 Cenário 1: Criar uma Nova Tarefa

Descrição detalhada do cenário de criar uma nova tarefa, explicando por que e como um desenvolvedor poderia usar esse recurso.

#### 7.1.1 Exemplo Prático

#### 7.1.1.1 Exemplo Prático

POST /tasks
`{
    "title": "Concluir Projeto",
    "description": "Finalizar todas as tarefas do projeto.",
    "status": "doing",
    "priority": "high",
    "owner": "Me",
    "active": true
}`

#### 7.1.1.2 Resposta Esperada

`{
    "id": 1,
    "title": "Concluir Projeto",
    "description": "Finalizar todas as tarefas do projeto.",
    "status": "doing",
    "priority": "high",
    "owner": "Me",
    "active": true
}`

## 8. Frameworks e Bibliotecas

Esta seção lista os frameworks e bibliotecas fundamentais utilizados no projeto. Compreender as tecnologias subjacentes é essencial para o desenvolvimento, manutenção e depuração eficazes do código.


### 8.1 Frameworks

## 8.1.1 Dependências

### 8.1.1.1 Principais Dependências

#### [axios](https://www.npmjs.com/package/axios) (v1.6.3)
- Uma biblioteca para fazer requisições HTTP.

#### [express](https://www.npmjs.com/package/express) (v4.18.2)
- Um framework web para Node.js utilizado para construir a camada de servidor da aplicação.

#### [moment](https://www.npmjs.com/package/moment) (v2.30.1)
- Uma biblioteca para manipulação de datas e horas.

#### [mysql](https://www.npmjs.com/package/mysql) (v2.18.1)
- Um driver para conexão com bancos de dados MySQL.

#### [mysql2](https://www.npmjs.com/package/mysql2) (v3.6.5)
- Uma versão aprimorada do driver MySQL para Node.js.

#### [sequelize](https://www.npmjs.com/package/sequelize) (v6.35.2)
- Um ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com bancos de dados relacionais.

#### [yamljs](https://www.npmjs.com/package/yamljs) (v0.3.0)
- Uma biblioteca para leitura e escrita de arquivos YAML.

### Dependências de Desenvolvimento

#### [@babel/core](https://www.npmjs.com/package/@babel/core) (v7.23.7)
- Núcleo do Babel, utilizado para transpilar código ECMAScript 6+ para versões anteriores do JavaScript.

#### [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) (v7.23.7)
- Um conjunto de plugins do Babel para ativar automaticamente as configurações de transpilação necessárias com base no ambiente.

#### [@jest/globals](https://www.npmjs.com/package/@jest/globals) (v29.7.0)
- Globals do Jest, utilizado para configuração global do Jest.

#### [eslint](https://www.npmjs.com/package/eslint) (v8.56.0)
- Uma ferramenta de linting para JavaScript e JSX.

#### [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) (v15.0.0)
- Configuração do ESLint baseada nas práticas do Airbnb para JavaScript.

#### [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) (v2.29.1)
- Plugin do ESLint para regras de importação.

#### [jest](https://www.npmjs.com/package/jest) (v29.7.0)
- Um framework de teste para JavaScript.

#### [nodemon](https://www.npmjs.com/package/nodemon) (v3.0.2)
- Uma ferramenta que reinicia automaticamente o servidor Node.js quando arquivos são modificados.

#### [supertest](https://www.npmjs.com/package/supertest) (v6.3.3)
- Uma biblioteca de teste para realizar requisições HTTP e testar APIs.

#### [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) (v5.0.0)
- Middleware Express para servir a interface do Swagger UI para visualização da documentação da API.

## Conclusão

Este documento fornece uma visão abrangente do projeto API de Gerenciamento de Tarefas. Com uma estrutura organizada, informações detalhadas sobre dependências, cenários de uso, e a hierarquia de pastas e arquivos, os desenvolvedores têm um guia completo para entender, contribuir e manter este projeto.

Agradecemos por explorar a documentação deste projeto. Esperamos que seja uma ferramenta útil para você. Sinta-se à vontade para contribuir, fornecer feedback ou compartilhar suas experiências. Juntos, fazemos a comunidade de desenvolvimento crescer.
