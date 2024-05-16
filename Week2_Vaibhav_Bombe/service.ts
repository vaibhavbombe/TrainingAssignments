import pool from './pgConfig';
// Create
async function createUser(id:number,name: string, email: string): Promise<any> {
 try {
 const query = 'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)';
 let result = await pool.query(query, [id,name, email])
 if(result){
 return result;
 }
 
}catch(err: any){
 return err
}
}
// Read
async function getUsers(): Promise<any[]> {
 const query = 'SELECT * FROM users';
 const result = await pool.query(query);
 return result.rows;
}
// Update
async function updateUser(id: number, name: string, email: string): Promise<any> {
 const query = 'UPDATE users SET name = $2, email = $3 WHERE id = $1';
 await pool.query(query, [id, name, email]);
}
// Delete
async function deleteUser(id: number): Promise<any> {
 const query = 'DELETE FROM users WHERE id = $1';
 await pool.query(query, [id]);
}
export { createUser, getUsers, updateUser, deleteUser }