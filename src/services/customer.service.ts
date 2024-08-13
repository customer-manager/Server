import db from '../database/firebase/database';
import { Customer } from '../models/customer.model';

export class CustomerService {
  private customersCollection = db.collection('customers');

  private toLowerCaseString(str: string): string {
    return str.toLowerCase();
  }

  async create(customer: Customer): Promise<Customer> {
    const customerData = { ...customer, customer_name: this.toLowerCaseString(customer.customer_name) };
    const docRef = await this.customersCollection.add(customerData);
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
    const lowerCaseName = this.toLowerCaseString(name);
    const snapshot = await this.customersCollection
      .where('customer_name', '>=', lowerCaseName)
      .where('customer_name', '<=', lowerCaseName + '\uf8ff')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer | null> {
    const updatedData = { ...customer, customer_name: customer.customer_name ? this.toLowerCaseString(customer.customer_name) : undefined };
    await this.customersCollection.doc(id).update(updatedData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.customersCollection.doc(id).delete();
  }
}
