namespace Dtos.Model
{
    public class ResponseModel
    {
        public bool status { get; set; }
        public string message { get; set; }
        public object data { get; set; }
        public ResponseModel()
        {

        }
        public ResponseModel(bool _status, string msg = null, object Data = null)
        {
            status = _status;
            message = msg;
            data = Data;
        }
    }
}
