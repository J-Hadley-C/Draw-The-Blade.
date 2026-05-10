<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260510120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add playCount, likesUp, likesDown to beats';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE beats ADD play_count INT DEFAULT 0 NOT NULL, ADD likes_up INT DEFAULT 0 NOT NULL, ADD likes_down INT DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE beats DROP play_count, DROP likes_up, DROP likes_down');
    }
}
