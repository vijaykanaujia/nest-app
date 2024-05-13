import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/corsOptions';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	// const app = await NestFactory.create(AppModule, {
	// 	bufferLogs: true,
	// });
	// app.useLogger(app.get(MyLoggerService));
	app.enableCors(corsOptions);
	app.setGlobalPrefix('api');
	await app.listen(3000);
}
bootstrap();
