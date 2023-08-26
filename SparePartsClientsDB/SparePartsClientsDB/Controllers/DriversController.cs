using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using SparePartsClientsDB.Models;

namespace SparePartsClientsDB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DriversController : ControllerBase
    {
       private readonly IConfiguration _configuration;
       
        public DriversController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ClientId, LastName, FirstName, Vehicle, Vin_code from 
                           dbo.Clients";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ClientsDBCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource)) 
            {
                myCon.Open();

                using(SqlCommand myCommand = new SqlCommand(query, myCon)) 
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Drivers drv)
        {
            string query = @"insert into dbo.Clients
                           (LastName, FirstName, Vehicle, Vin_code)
                           values (@LastName, @FirstName, @Vehicle, @Vin_code)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ClientsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@LastName", drv.LastName);
                    myCommand.Parameters.AddWithValue("@FirstName", drv.FirstName);
                    myCommand.Parameters.AddWithValue("@Vehicle", drv.Vehicle);
                    myCommand.Parameters.AddWithValue("@Vin_code", drv.Vin_code);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Новый клиент добавлен.");
        }

        [HttpPut]
        public JsonResult Put(Drivers drv)
        {
            string query = @"update dbo.Clients
                           set LastName=@LastName, FirstName=@FirstName, Vehicle=@Vehicle, Vin_code=@Vin_code
                           where ClientId=@ClientId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ClientsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ClientId", drv.ClientId);
                    myCommand.Parameters.AddWithValue("@LastName", drv.LastName);
                    myCommand.Parameters.AddWithValue("@FirstName", drv.FirstName);
                    myCommand.Parameters.AddWithValue("@Vehicle", drv.Vehicle);
                    myCommand.Parameters.AddWithValue("@Vin_code", drv.Vin_code);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Данные клиента обновлены.");
        }

        [HttpDelete("{Id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Clients
                           where ClientId=@ClientId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("ClientsDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ClientId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Данные клиента удалены.");
        }

    }
}
