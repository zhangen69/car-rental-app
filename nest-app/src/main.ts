import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`NestJs App is listening on localhost:${port}:`);
    console.log(`Open your browser on http://localhost:${port}/`);
  });
}
bootstrap();
