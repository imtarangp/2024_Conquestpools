#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["ConquestWebPortal/ConquestWebPortal.csproj", "ConquestWebPortal/"]
COPY ["CoreLibrary/CoreLibrary.csproj", "CoreLibrary/"]
COPY ["Dtos/Dtos.csproj", "Dtos/"]
COPY ["BLL/BLL.csproj", "BLL/"]
COPY ["DAL/DAL.csproj", "DAL/"]
RUN dotnet restore "ConquestWebPortal/ConquestWebPortal.csproj"
COPY . .
WORKDIR "/src/ConquestWebPortal"
RUN dotnet build "ConquestWebPortal.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ConquestWebPortal.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConquestWebPortal.dll"]