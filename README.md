## 📖 Sobre

Projeto desenvolvido durante o NLW da Rocketseat | Trilha NodeJs.
</br>

## ⚙ Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

**Linguagens de programação:**

* **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript, permitindo um desenvolvimento mais robusto e confiável.

**Frameworks:**

* **Node:** Ambiente de tempo de execução JavaScript que permite executar código JavaScript fora do navegador.
* **Fastify:** Framework web Node.js leve e performante para construir APIs e aplicações web.

**Bibliotecas:**

* **Zod:** Biblioteca de validação de dados robusta e flexível.
* **@fastify/cors:** Permite configurar CORS (Cross-Origin Resource Sharing) na API.
* **@fastify/swagger:** Integra documentação Swagger à API.
* **@fastify/swagger-ui:** Interface gráfica para visualizar a documentação da API.
* **@prisma/client:** Cliente Prisma para interagir com o banco de dados SQLite.

**Outras ferramentas:**

* **Tsup:** Compilador TypeScript rápido e eficiente.

**Observações:**

* Este projeto usa o Prisma como ORM (Object-Relational Mapping) para interagir com o banco de dados SQLite.
* O projeto também usa o Fastify Type Provider Zod para validação de dados de entrada e saída da API.

## 💻 Projeto
# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poser visualizar a lista de participantes; 
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x] O check-in no evento será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src=".github/erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```