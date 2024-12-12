using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.UseCors(options =>
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()); 


app.MapGet("/", () => "Inicio");

app.MapPost("/usuario/cadastrar", ([FromBody] Usuario usuario,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created($"/imc/{usuario.Id}", usuario);
});

app.MapGet("/usuario/listar", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Usuarios.ToList());
});

app.MapPost("/imc/cadastrar", ([FromBody] Imc imc,
    [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(imc.UsuarioId);

    if (usuario is null)
        return Results.NotFound("Usuario não encontrado");

    imc.Usuario = usuario;
    imc.Indice = imc.Peso / (imc.Altura * imc.Altura);

    if (imc.Indice <= 18.5)
        imc.Categoria = "Magreza";
    else if (imc.Indice <= 24.9)
        imc.Categoria = "Normal";
    else if (imc.Indice <= 29.9)
        imc.Categoria = "Sobrepeso";
    else if (imc.Indice <= 39.9)
        imc.Categoria = "Obeso";
    else
        imc.Categoria = "Obesidade Grave";

    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created($"/imc/{imc.Id}", imc);
});

app.MapGet("/imc/listar", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Imcs.ToList());
});

app.MapPut("/imc/alterar/{id}", ([FromRoute] int id,
    [FromBody] Imc ImcAlterada,
    [FromServices] AppDataContext ctx) =>
{
    Imc? imc = ctx.Imcs.Find(id);
    if (imc is null)
    {
        return Results.NotFound();
    }

    imc.Peso = ImcAlterada.Peso;
    imc.Altura = ImcAlterada.Altura;
    imc.Indice = imc.Peso / (imc.Altura * imc.Altura);

      if (imc.Indice <= 18.5)
        imc.Categoria = "Magreza";
    else if (imc.Indice <= 24.9)
        imc.Categoria = "Normal";
    else if (imc.Indice <= 29.9)
        imc.Categoria = "Sobrepeso";
    else if (imc.Indice <= 39.9)
        imc.Categoria = "Obeso";
    else
        imc.Categoria = "Obesidade Grave";

    ctx.Imcs.Update(imc);
    ctx.SaveChanges();
    return Results.Ok(imc);
});

app.Run();