import { CollectionReference, DocumentData } from 'firebase-admin/firestore';
import db from '../database/firebase/database'; // Firebase bağlantı dosyanız
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';

export class AuthService {
  private usersCollection: CollectionReference<DocumentData> = db.collection('users');

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userDoc = this.usersCollection.doc();
    await userDoc.set({
      ...user,
      password: hashedPassword
    });
    const doc = await userDoc.get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    const snapshot = await this.usersCollection.where('username', '==', username).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.usersCollection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as User : null;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
