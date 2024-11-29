using CoreLibrary;
using Dtos.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace DAL
{
    public class PQ
    {
        public string Query { get; set; }
        public SqlParameter[] Parameters { get; set; }
    }
    public class ProcParams
    {
        public string Name { get; set; }
        public object Val { get; set; }
    }
    public partial class ClientBaseServices
    {
        public async Task<ResponseModel> BegnTransactionAsync(List<PQ> obj)
        {
            using (SqlConnection con = new SqlConnection(Setting.ConnectionString))
            {
                SqlTransaction trans;

                await con.OpenAsync();
                trans = con.BeginTransaction();
                try
                {
                    foreach (var i in obj)
                    {
                        SqlCommand cmd = new SqlCommand();
                        cmd.Connection = con;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = i.Query.Split("@")[0].Replace("Exec ", "");
                        cmd.Parameters.AddRange(i.Parameters);
                        cmd.Transaction = trans;
                       await cmd.ExecuteNonQueryAsync();
                    }
                    trans.Commit();
                }
                catch (SqlException sqlError)
                {
                   await trans.RollbackAsync();
                    await trans.DisposeAsync();
                    return new ResponseModel
                    {
                        status = false,
                        message = sqlError.Message
                    };
                }
                trans.Dispose();
                return new ResponseModel
                {
                    status = true
                };
            }
        }
        protected async Task<List<T>> ExecuteQueryCommandAsync<T>(string procName, params object[] procParams)
        {
            using (SqlConnection connection = new SqlConnection(Setting.ConnectionString))
            {
               await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand())
                {
                    DataTable dt = new DataTable();
                    command.Connection = connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = procName.Split("@")[0].Replace("Exec ", "");
                    command.Parameters.AddRange(procParams);
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(dt);
                    connection.Close();
                    return ConvertDt<T>(dt);
                }
            }
        }
        protected int NonQuerySpCommand(string procName, params object[] procParams)
        {
            using (SqlConnection connection = new SqlConnection(Setting.ConnectionString))
            {
                int ret = 0;
                connection.Open();
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = procName.Split("@")[0].Replace("Exec ", "");
                    command.Parameters.AddRange(procParams);
                    ret = command.ExecuteNonQuery();
                    connection.Close();
                    return ret;
                }
            }
        }
        protected int ScalarSpCommand(string procName, params object[] procParams)
        {
            using (SqlConnection connection = new SqlConnection(Setting.ConnectionString))
            {
                int ret = 0;
                connection.Open();
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = procName.Split("@")[0].Replace("Exec ", "");
                    command.Parameters.AddRange(procParams);
                    ret = Convert.ToInt32(command.ExecuteScalar());
                    connection.Close();
                    return ret;
                }
            }
        }
        public static PQ BuilQP(string procName, List<ProcParams> procValues)
        {
            string sqlQuery = "Exec " + procName + " ";
            var sqlParams = new List<SqlParameter>();
            var i = 0;
            var procValuesLen = procValues.Count();
            procName = procName.Trim();
            foreach (var item in procValues)
            {
                sqlQuery += item.Name + (i != procValuesLen - 1 ? " , " : "");
                sqlParams.Add(new SqlParameter(item.Name, item.Val ?? (object)DBNull.Value));
                i++;
            }
            return new PQ { Query = sqlQuery, Parameters = sqlParams.ToArray() };
        }

        public static List<T> ConvertDt<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();
            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {

                    if (pro.Name == column.ColumnName)
                    {
                        if (dr[column.ColumnName] == DBNull.Value)
                        {
                            pro.SetValue(obj, null, null);
                        }
                        else
                        {
                            pro.SetValue(obj, dr[column.ColumnName], null);
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            return obj;
        }
    }

}
