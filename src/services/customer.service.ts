import db from '../database/firebase/database';
import { Customer } from '../models/customer.model';

export class CustomerService {
  private customersCollection = db.collection('customers');

  async create(customer: Customer): Promise<Customer> {
    const docRef = await this.customersCollection.add(customer);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Customer;
  }

  async findAll(): Promise<Customer[]> {
    const snapshot = await this.customersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
  }

  async findById(id: string): Promise<Customer | null> {
    const doc = await this.customersCollection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as Customer : null;
  }


  async search(name: string): Promise<Customer[]> {
    const snapshot = await this.customersCollection
      .where('customer_name', '>=', name)
      .where('customer_name', '<=', name + '\uf8ff')
      .get();
      let customers=snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
    return customers;
  }


  async update(id: string, customer: Partial<Customer>): Promise<Customer | null> {
    await this.customersCollection.doc(id).update(customer);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.customersCollection.doc(id).delete();
  }
}
