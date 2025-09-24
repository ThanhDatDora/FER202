export function Exercise2(){
//1. Tạo một mảng số nguyên, in ra danh sách list
    const numbers = [1, -12, -3, 4, 5, 20, -10, 8, 7, -6];
    // 2. Tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //3. Tính trung bình các phần tử trong mảng
    const average = sum / numbers.length;
    //4. Khai báo mảng chuỗi names, in ra danh sách các tên, theo thứ tự tăng dần alphabetic
    const names = ["An", "Bình", "Cường", "Dũng", "Hà", "Hùng", "Lan", "Minh", "Nam", "Phương"];
    //5. Khai báo 1 mảng students chứa 10 đối tượng student, mỗi đối tượng có các thuộc tính id, name, age, grade (id là số nguyên, name là chuỗi
    //age là số nguyên, grade là số thực)
    const students = [
        {id: 1, name: "An", age: 20, grade: 8.5},
        {id: 2, name: "Bình", age: 21, grade: 7.0},
        {id: 3, name: "Cường", age: 22, grade: 9.0},
        {id: 4, name: "Dũng", age: 23, grade: 6.5},
        {id: 5, name: "Hà", age: 24, grade: 8.0},
        {id: 6, name: "Hùng", age: 25, grade: 7.5},
        {id: 7, name: "Lan", age: 26, grade: 9.5},
        {id: 8, name: "Minh", age: 27, grade: 6.0},
        {id: 9, name: "Nam", age: 28, grade: 8.0},
        {id: 10, name: "Phương", age: 29, grade: 7.0}
    ];
    //In ra danh sách sinh viên có grade >= 7.5 theo thứ tự giảm dần của grade
    const goodStudents = students
    .filter(student => student.grade >= 7.5)
    .sort((a, b) => b.grade - a.grade);
    names.sort();

    // In ra danh schs goodStudents theo dạng bảng

    return (<div>
        <h1>Exercise 2</h1>
        <p>In mảng số nguyên:</p>
        <ul>
            {numbers.map((num, i) => 
                (<li key={i}>Phần tử thứ {i}-{num}</li>
                    
                ))}

        </ul>
        <p>Tổng các phần tử của mảng: </p>
        <p>{sum}</p>
        <p>Trung bình các phần tử của mảng: </p>
        <p>{average.toFixed(2)}</p>

        <p>In ra danh sách các tên</p>
        <ul>
            {names.map((name, i) => (<li key={i}>{name}</li>))}
            </ul>
        <p>Danh sách sinh viên có grade lớn hoặc bằng 7.5 theo thứ tự giảm dần của grade</p>
        <ul>
            {goodStudents.map(student => (
                <li key={student.id}>
                    ID: {student.id}, Name: {student.name}, Age: {student.age}, Grade: {student.grade}
                </li>
            ))}
        </ul>

        <p>hiển thị danh sách goodStudents dưới dạng bảng</p>
        <table class="table" border="1" cellPadding="5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    
                </tr>
            </thead>
            <tbody>
                {goodStudents.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.grade}</td>
                    </tr>
                ))}
            </tbody> 
            <tfoot>
                <tr>
                    <td colSpan="3">Trung Bình Grade:</td>
                    <td class="ave">{(goodStudents.reduce((acc, student) => acc + student.grade, 0) / goodStudents.length).toFixed(2)}</td>
                    </tr>
                    </tfoot>
        </table>
                
            
    </div>
    
    );


}
export default Exercise2;