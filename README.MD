# Pokecenter - API de Microsserviços

[![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-%231B222D.svg?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-%232496ED.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

Bem-vindo ao Pokecenter, uma API robusta desenvolvida em NestJS, Prisma ORM e Docker, projetada com a arquitetura de microsserviços. Este repositório abrange os microsserviços de Gateway, Users e Financial, oferecendo uma solução escalável e modular.

## Inicialização Rápida

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/pokecenter.git
   cd pokecenter
   ```

2. **Inicie o Ambiente Docker:**

   ```bashs
   docker-compose up -d
   ```

3. **Execute as Migrações no MS:Users:**

   ```bash
   docker-compose exec pokecenter_ms_users_dev npx prisma migrate dev
   ```

4. **Execute as Migrações no MS:Financial:**

   ```bash
   docker-compose exec pokecenter_ms_financial_dev npx prisma migrate dev
   ```

5. **(Opcional) Execute o seed.js para enviar dados Mockados:**

   ```bash
   docker-compose exec pokecenter_ms_users_dev node prisma/seed.js
   ```

## Acessando a Aplicação

Após iniciar o ambiente Docker, você pode acessar a aplicação em `localhost:3000/swagger`. Lá você encontrará a documentação da API e poderá testar os endpoints disponíveis.

## Microsserviços

### Gateway

O MS:Gateway serve como um intermediário entre as requisições dos clientes e os microsserviços, proporcionando uma experiência unificada.

### Users

O MS:Users é especializado em funcionalidades relacionadas aos usuários.

### Financial

O MS:Financial concentra-se em operações financeiras.
