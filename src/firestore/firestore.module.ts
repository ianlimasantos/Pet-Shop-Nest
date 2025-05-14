import { Module } from '@nestjs/common';
import { firestore } from './firebase.config';

@Module({
    providers: [
        {
            provide: 'FIRESTORE',
            useValue: firestore
        },
    ],
    exports: ['FIRESTORE'],
})
export class FirestoreModule {}
