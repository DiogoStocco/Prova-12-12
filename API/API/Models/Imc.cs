namespace API.Models;

public class Imc
{
    public int Id { get; set; }
    public double Indice { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public string Categoria { get; set; }
    public int UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
}