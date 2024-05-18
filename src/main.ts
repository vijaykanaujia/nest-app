import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/corsOptions';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// const app = await NestFactory.create(AppModule, {
	// 	bufferLogs: true,
	// });
	// app.useLogger(app.get(MyLoggerService));

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
	
	app.enableCors(corsOptions);
	app.setGlobalPrefix('api');
	await app.listen(3000);
}
bootstrap();
