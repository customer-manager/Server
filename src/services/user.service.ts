import db from '../database/firebase/database';
import { User } from '../models/user.model';

export class UserService {
  private usersCollection = db.collection('users');

  async create(user: User): Promise<User> {
    const docRef = await this.usersCollection.add(user);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.usersCollection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as User : null;
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    await this.usersCollection.doc(id).update(user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersCollection.doc(id).delete();
  }
}
