import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'telefono', 'correo', 'departamento','editar'];

  newEmployeeData: any = {
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: '',
    fechacontratacion: '',
    idarea: 0
  };
  
  showForm = false;
  editingEmployee: any = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.getEmployees();
    }
  }

  getEmployees() {
    this.http.get<any[]>(`${environment.apiEmployeesUrl}`).subscribe(
      response => {
        this.employees = response.sort((a, b) => b.id - a.id);
      },
      error => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }

  createEmployee(): void {
    this.newEmployeeData.fechacontratacion = this.getCurrentDate();

    this.http.post<any>(`${environment.apiCreateEmploye}`, this.newEmployeeData).subscribe(
      response => {
        console.log('Empleado creado exitosamente:', response);
        this.getEmployees();
        this.clearNewEmployeeData();
        this.showForm = false;
      },
      error => {
        console.error('Error al crear el empleado:', error);
      }
    );
  }

  saveEmployee(): void {
    if (this.editingEmployee) {
        const updatedEmployeeData = {
            id: this.editingEmployee.id.toString(),
            nombres: this.newEmployeeData.nombres,
            apellidos: this.newEmployeeData.apellidos,
            telefono: this.newEmployeeData.telefono,
            correo: this.newEmployeeData.correo,
            fechacontratacion: this.newEmployeeData.fechacontratacion,
            idarea: this.newEmployeeData.idarea
        };

        this.http.put<any>(`${environment.apiEditEmployee}/${this.editingEmployee.id}`, updatedEmployeeData).subscribe(
            response => {
                console.log('Empleado editado exitosamente:', response);
                this.getEmployees(); // Actualizar la lista después de editar el empleado
                this.clearNewEmployeeData();
                this.showForm = false;
            },
            error => {
                console.error('Error al editar el empleado:', error);
            }
        );
    } else {
        this.createEmployee();
    }
}

  cancel(): void {
    this.clearNewEmployeeData();
    this.showForm = false;
  }

  clearNewEmployeeData(): void {
    this.newEmployeeData = {
      nombres: '',
      apellidos: '',
      telefono: '',
      correo: '',
      fechacontratacion: this.getCurrentDate(),
      idarea: 0
    };
  }

  toggleForm(): void {
    this.editingEmployee = null;
    this.showForm = !this.showForm;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    this.authService.logout();
  }

  editEmployee(employee: any): void {
    this.editingEmployee = employee;
    this.newEmployeeData = { ...employee };
    this.newEmployeeData.fechacontratacion = this.getCurrentDate();
    this.showForm = true;
  }
}









