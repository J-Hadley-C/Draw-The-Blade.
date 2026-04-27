<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260426214730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE beats (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, genre VARCHAR(50) NOT NULL, bpm INT NOT NULL, key_signature VARCHAR(10) NOT NULL, duration VARCHAR(20) NOT NULL, description LONGTEXT NOT NULL, price NUMERIC(10, 2) NOT NULL, is_free TINYINT NOT NULL, image_path VARCHAR(255) DEFAULT NULL, audio_path VARCHAR(255) DEFAULT NULL, in_carousel TINYINT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE beats');
    }
}
