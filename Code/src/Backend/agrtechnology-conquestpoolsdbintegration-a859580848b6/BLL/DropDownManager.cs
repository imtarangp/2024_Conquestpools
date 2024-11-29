using DAL.ADOService;
using DAL.RequestDTO;
using Dtos.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL
{
    public class DropDownManager : ADOService
    {
        readonly LoggedInUser _LoggedInUser;

        public DropDownManager()
        {

        }
        public DropDownManager(LoggedInUser loggedInUser)
        {
            this._LoggedInUser = loggedInUser;
        }
        public async Task<List<AccessoriesItemDTO>> GetAccessoriesItem()
        {
            var pQ = BuilQP("USP_AccessoriesItem_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<AccessoriesItemDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<BlanketRollerDTO>> GetBlanketRoller()
        {
            var pQ = BuilQP("USP_BlanketRoller_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<BlanketRollerDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<ConquestDealerDTO>> GetConquestDealer()
        {
            var pQ = BuilQP("USP_ConquestDealer_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<ConquestDealerDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<EmployeeDTO>> GetEmployee()
        {
            var pQ = BuilQP("USP_Employee_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<EmployeeDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<HandoverKitDTO>> GetHandoverKit()
        {
            var pQ = BuilQP("USP_HandoverKit_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<HandoverKitDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<HeatingDTO>> GetHeating()
        {
            var pQ = BuilQP("USP_Heating_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<HeatingDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<ManufacturingItemDTO>> GetManufacturingItem()
        {
            var pQ = BuilQP("USP_ManufacturingItem_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<ManufacturingItemDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PipeDTO>> GetPipe()
        {
            var pQ = BuilQP("USP_Pipe_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PipeDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PoolColourDTO>> GetPoolColour()
        {
            var pQ = BuilQP("USP_PoolColour_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PoolColourDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PoolLightsDTO>> GetPoolLights()
        {
            var pQ = BuilQP("USP_PoolLights_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PoolLightsDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PoolSaltDTO>> GetPoolSalt()
        {
            var pQ = BuilQP("USP_PoolSalt_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PoolSaltDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PoolShapeDTO>> GetPoolShape()
        {
            var pQ = BuilQP("USP_PoolShape_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PoolShapeDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PoolSizeDTO>> GetPoolSize()
        {
            var pQ = BuilQP("USP_PoolSize_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PoolSizeDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<SerialNumberDTO>> GetSerialNumber()
        {
            var pQ = BuilQP("USP_SerialNumber_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<SerialNumberDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<SkimmerDTO>> GetSkimmer()
        {
            var pQ = BuilQP("USP_Skimmer_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<SkimmerDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<SpaJetsDTO>> GetSpaJets()
        {
            var pQ = BuilQP("USP_SpaJets_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<SpaJetsDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<TransformerDTO>> GetTransformer()
        {
            var pQ = BuilQP("USP_Transformer_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<TransformerDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PumpDTO>> GetPump()
        {
            var pQ = BuilQP("USP_Pump_Get", new List<ProcParams>
            {
            });
            return await ExecuteQueryCommandAsync<PumpDTO>(pQ.Query, pQ.Parameters);
        }
    }
}
